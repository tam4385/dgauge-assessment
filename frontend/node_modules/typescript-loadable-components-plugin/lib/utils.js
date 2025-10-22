"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:59:07
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImportCallList = exports.getRealExpression = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function getRealExpression(node) {
    return ts.isParenthesizedExpression(node)
        ? getRealExpression(node.expression)
        : ts.isAsExpression(node)
            ? getRealExpression(node.expression)
            : node;
}
exports.getRealExpression = getRealExpression;
function getImportCallList(body) {
    const imports = [];
    const visitor = (node) => {
        if (ts.isCallExpression(node) &&
            node.expression.kind === ts.SyntaxKind.ImportKeyword) {
            imports.push(node);
        }
        ts.forEachChild(node, visitor);
    };
    visitor(body);
    return imports;
}
exports.getImportCallList = getImportCallList;
//# sourceMappingURL=utils.js.map