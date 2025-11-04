"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-02 00:10:00
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolve = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function createResolve(state, target, loader) {
    const requestNode = target.arguments[0];
    return ts.factory.createMethodDeclaration(void 0, void 0, void 0, 'resolve', void 0, void 0, loader.parameters, void 0, ts.factory.createBlock([
        ts.factory.createIfStatement(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('require'), 'resolveWeak'), ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createPropertyAccessExpression(ts.factory.createIdentifier('require'), 'resolveWeak'), void 0, [requestNode])), ts.factory.createReturnStatement(ts.factory.createCallExpression(ts.factory.createCallExpression(ts.factory.createIdentifier('eval'), void 0, [ts.factory.createStringLiteral('require.resolve')]), void 0, [requestNode]))),
    ]));
}
exports.createResolve = createResolve;
//# sourceMappingURL=createResolve.js.map