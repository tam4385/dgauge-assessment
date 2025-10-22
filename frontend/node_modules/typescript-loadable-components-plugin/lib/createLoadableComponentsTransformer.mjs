/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:01:37
 */
import * as ts from 'typescript';
import { createChunkName } from './properties/createChunkName';
import { createIsReady } from './properties/createIsReady';
import { createRequireAsync } from './properties/createRequireAsync';
import { createRequireSync } from './properties/createRequireSync';
import { createResolve } from './properties/createResolve';
import { State } from './State';
import { getImportCallList, getRealExpression } from './utils';
var properties = [
    createChunkName,
    createIsReady,
    createRequireAsync,
    createRequireSync,
    createResolve,
];
function visitLoadableComponents(state, node) {
    if (!ts.isCallExpression(node) || node.arguments.length === 0) {
        return node;
    }
    var loader = getRealExpression(node.arguments[0]);
    if (!ts.isFunctionExpression(loader) && !ts.isArrowFunction(loader)) {
        return node;
    }
    var identifier = getRealExpression(node.expression);
    if (ts.isPropertyAccessExpression(identifier) &&
        identifier.name.escapedText === 'lib') {
        identifier = getRealExpression(identifier.expression);
    }
    if (!ts.isIdentifier(identifier) || identifier.escapedText !== 'loadable') {
        return node;
    }
    var importList = getImportCallList(loader.body);
    if (importList.length === 0) {
        return node;
    }
    if (importList.length > 1) {
        throw new Error('loadable: multiple import calls inside `loadable()` function are not supported.');
    }
    var args = node.arguments.slice();
    args[0] = ts.factory.createObjectLiteralExpression(properties.map(function (fn) { return fn(state, importList[0], loader); }), true);
    return ts.factory.createCallExpression(node.expression, void 0, args);
}
export function createLoadableComponentsTransformer(program, options) {
    var state = new State(program, options);
    return function (context) {
        state.context = context;
        return function (source) {
            state.sourceFile = source;
            var visitor = function (node) {
                node = visitLoadableComponents(state, node);
                return ts.visitEachChild(node, visitor, context);
            };
            return ts.visitNode(source, visitor);
        };
    };
}
//# sourceMappingURL=createLoadableComponentsTransformer.js.map