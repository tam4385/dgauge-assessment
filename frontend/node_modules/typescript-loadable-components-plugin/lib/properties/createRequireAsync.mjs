/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-02 00:10:00
 */
import * as ts from 'typescript';
export function createRequireAsync(state, target, loader) {
    return ts.factory.createPropertyAssignment('requireAsync', loader);
}
//# sourceMappingURL=createRequireAsync.js.map