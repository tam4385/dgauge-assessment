"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:01:37
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoadableComponentsTransformer = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const createChunkName_1 = require("./properties/createChunkName");
const createIsReady_1 = require("./properties/createIsReady");
const createRequireAsync_1 = require("./properties/createRequireAsync");
const createRequireSync_1 = require("./properties/createRequireSync");
const createResolve_1 = require("./properties/createResolve");
const State_1 = require("./State");
const utils_1 = require("./utils");
const properties = [
    createChunkName_1.createChunkName,
    createIsReady_1.createIsReady,
    createRequireAsync_1.createRequireAsync,
    createRequireSync_1.createRequireSync,
    createResolve_1.createResolve,
];
function visitLoadableComponents(state, node) {
    if (!ts.isCallExpression(node) || node.arguments.length === 0) {
        return node;
    }
    const loader = utils_1.getRealExpression(node.arguments[0]);
    if (!ts.isFunctionExpression(loader) && !ts.isArrowFunction(loader)) {
        return node;
    }
    let identifier = utils_1.getRealExpression(node.expression);
    if (ts.isPropertyAccessExpression(identifier) &&
        identifier.name.escapedText === 'lib') {
        identifier = utils_1.getRealExpression(identifier.expression);
    }
    if (!ts.isIdentifier(identifier) || identifier.escapedText !== 'loadable') {
        return node;
    }
    const importList = utils_1.getImportCallList(loader.body);
    if (importList.length === 0) {
        return node;
    }
    if (importList.length > 1) {
        throw new Error('loadable: multiple import calls inside `loadable()` function are not supported.');
    }
    const args = node.arguments.slice();
    args[0] = ts.factory.createObjectLiteralExpression(properties.map((fn) => fn(state, importList[0], loader)), true);
    return ts.factory.createCallExpression(node.expression, void 0, args);
}
function createLoadableComponentsTransformer(program, options) {
    const state = new State_1.State(program, options);
    return (context) => {
        state.context = context;
        return (source) => {
            state.sourceFile = source;
            const visitor = (node) => {
                node = visitLoadableComponents(state, node);
                return ts.visitEachChild(node, visitor, context);
            };
            return ts.visitNode(source, visitor);
        };
    };
}
exports.createLoadableComponentsTransformer = createLoadableComponentsTransformer;
//# sourceMappingURL=createLoadableComponentsTransformer.js.map