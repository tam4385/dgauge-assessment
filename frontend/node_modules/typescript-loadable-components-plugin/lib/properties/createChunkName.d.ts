/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:37:34
 *
 * some of the code comes from
 * {@link https://github.com/smooth-code/loadable-components/blob/master/packages/babel-plugin/src/properties/chunkName.js}
 */
import * as ts from 'typescript';
import { State } from '../State';
export declare function createChunkName(state: State, target: ts.CallExpression, loader: ts.FunctionExpression | ts.ArrowFunction): ts.ObjectLiteralElementLike;
