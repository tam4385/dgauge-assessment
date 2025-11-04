/*!
 * Copyright 2019 acrazing <joking.young@gmail.com>. All rights reserved.
 * @since 2019-11-01 23:59:07
 */
import * as ts from 'typescript';
export declare function getRealExpression(node: ts.Node): ts.Node;
export declare function getImportCallList(body: ts.ConciseBody): ts.CallExpression[];
