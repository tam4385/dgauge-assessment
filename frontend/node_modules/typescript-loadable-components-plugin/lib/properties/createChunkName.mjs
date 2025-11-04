import { __read, __values } from "tslib";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:37:34
 *
 * some of the code comes from
 * {@link https://github.com/smooth-code/loadable-components/blob/master/packages/babel-plugin/src/properties/chunkName.js}
 */
import * as ts from 'typescript';
import * as vm from 'vm';
// https://github.com/webpack/webpack/blob/3f135f59b04b7a85e50564d882f860db67a754bf/lib/javascript/JavascriptParser.js#L91
var webpackCommentRegExp = new RegExp(/(^|\W)webpack[A-Z]+[A-Za-z]+:/);
var JS_PATH_REGEXP = /^[./]+|(\.js$)/g;
var MATCH_LEFT_HYPHENS_REPLACE_REGEX = /^-/g;
var WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX = /[^a-zA-Z0-9_!§$()=\-^°]+/g;
var WEBPACK_MATCH_PADDED_HYPHENS_REPLACE_REGEX = /^-|-$/g;
function getLeadingComments(state, requestNode) {
    var e_1, _a;
    var result = {
        webpack: {},
        others: [],
        hasWebpack: false,
    };
    var commentRanges = ts.getLeadingCommentRanges(state.sourceFile.text, requestNode.pos) || [];
    try {
        for (var commentRanges_1 = __values(commentRanges), commentRanges_1_1 = commentRanges_1.next(); !commentRanges_1_1.done; commentRanges_1_1 = commentRanges_1.next()) {
            var range = commentRanges_1_1.value;
            var comment = state.sourceFile.text.substring(range.pos + 2, range.end - (range.kind === ts.SyntaxKind.MultiLineCommentTrivia ? 2 : 0));
            if (!result.hasWebpack && webpackCommentRegExp.test(comment)) {
                try {
                    result.webpack = vm.runInNewContext("({ " + comment + " })") || {};
                    result.hasWebpack = true;
                }
                catch (e) {
                    throw new SyntaxError(e + " while parsing webpack comment: /*" + comment + "*/");
                }
            }
            else {
                result.others.push([range, comment]);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (commentRanges_1_1 && !commentRanges_1_1.done && (_a = commentRanges_1.return)) _a.call(commentRanges_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return result;
}
// see {@link https://stackoverflow.com/a/55173278/4380247}
function replaceWebpackComment(state, request, commentsState) {
    var e_2, _a;
    var fullStart = request.getFullStart();
    var visitor = function (child) {
        if (child.getFullStart() === fullStart) {
            ts.setTextRange(child, { pos: child.getStart(), end: child.getEnd() });
        }
        return ts.visitEachChild(child, visitor, state.context);
    };
    ts.visitEachChild(request, visitor, state.context);
    ts.setTextRange(request, { pos: request.getStart(), end: request.getEnd() });
    var webpackComment = Object.keys(commentsState.webpack)
        .map(function (p) {
        return p + ': ' + JSON.stringify(commentsState.webpack[p]);
    })
        .join(',');
    ts.addSyntheticLeadingComment(request, ts.SyntaxKind.MultiLineCommentTrivia, " " + webpackComment + " ", commentsState.others.length > 0);
    try {
        for (var _b = __values(commentsState.others), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), range = _d[0], text = _d[1];
            ts.addSyntheticLeadingComment(request, range.kind, text, range.hasTrailingNewLine);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
export function createChunkName(state, target, loader) {
    var requestNode = target.arguments[0];
    var leadingComments = getLeadingComments(state, requestNode);
    var chunkNameNode;
    var webpackChunkName;
    if (!ts.isTemplateExpression(requestNode) &&
        leadingComments.webpack.webpackChunkName) {
        webpackChunkName = leadingComments.webpack.webpackChunkName;
        chunkNameNode = ts.factory.createStringLiteral(webpackChunkName);
    }
    else if (ts.isTemplateExpression(requestNode)) {
        webpackChunkName = requestNode.head.text
            .replace(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX, '-')
            .replace(MATCH_LEFT_HYPHENS_REPLACE_REGEX, '');
        chunkNameNode = ts.factory.createCallExpression(ts.factory.createPropertyAccessChain(ts.factory.createTemplateExpression(ts.factory.createTemplateHead(webpackChunkName), requestNode.templateSpans.map(function (span, index) {
            var text = span.literal.text.replace(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX, '-');
            return ts.factory.createTemplateSpan(span.expression, index === requestNode.templateSpans.length - 1
                ? ts.factory.createTemplateTail(text)
                : ts.factory.createTemplateMiddle(text));
        })), void 0, 'replace'), void 0, [
            ts.factory.createRegularExpressionLiteral("/" + WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX.source + "/g"),
            ts.factory.createStringLiteral('-'),
        ]);
        webpackChunkName += '[request]';
    }
    else if (ts.isStringLiteral(requestNode) ||
        ts.isNoSubstitutionTemplateLiteral(requestNode)) {
        webpackChunkName = requestNode.text
            .replace(JS_PATH_REGEXP, '')
            .replace(WEBPACK_PATH_NAME_NORMALIZE_REPLACE_REGEX, '-')
            .replace(WEBPACK_MATCH_PADDED_HYPHENS_REPLACE_REGEX, '');
        chunkNameNode = ts.factory.createStringLiteral(webpackChunkName);
    }
    else {
        throw new Error("unexpected import argument kind: " + requestNode);
    }
    if (leadingComments.webpack.webpackChunkName !== webpackChunkName) {
        leadingComments.webpack.webpackChunkName = webpackChunkName;
        replaceWebpackComment(state, requestNode, leadingComments);
    }
    return ts.factory.createMethodDeclaration(void 0, void 0, void 0, 'chunkName', void 0, void 0, loader.parameters, void 0, ts.factory.createBlock([ts.factory.createReturnStatement(chunkNameNode)]));
}
//# sourceMappingURL=createChunkName.js.map