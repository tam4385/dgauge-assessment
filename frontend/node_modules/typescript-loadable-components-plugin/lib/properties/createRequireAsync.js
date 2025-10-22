"use strict";
/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-02 00:10:00
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRequireAsync = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
function createRequireAsync(state, target, loader) {
    return ts.factory.createPropertyAssignment('requireAsync', loader);
}
exports.createRequireAsync = createRequireAsync;
//# sourceMappingURL=createRequireAsync.js.map