define(["require", "exports", "core/Node"], function (require, exports, MNode) {
    "use strict";
    var ash;
    (function (ash) {
        var core;
        (function (core) {
            /**
             * This export class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
             * from object creation and garbage collection.
             *
             * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
             * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
             * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
             */
            var NodePool = (function () {
                /**
                 * Creates a pool for the given node class.
                 */
                function NodePool(nodeClass) {
                    this._nodeClass = nodeClass;
                }
                /**
                 * Fetches a node from the pool.
                 */
                NodePool.prototype.get = function () {
                    if (this._tail) {
                        var node = this._tail;
                        this._tail = this._tail.previous;
                        node.previous = null;
                        return node;
                    }
                    else {
                        //TODO: not really nice
                        return new MNode.ash.core.Node(); //new this._nodeClass();
                    }
                };
                /**
                 * Adds a node to the pool.
                 */
                NodePool.prototype.dispose = function (node) {
                    node.next = null;
                    node.previous = this._tail;
                    this._tail = node;
                };
                /**
                 * Adds a node to the cache
                 */
                NodePool.prototype.cache = function (node) {
                    node.previous = this._cacheTail;
                    this._cacheTail = node;
                };
                /**
                 * Releases all nodes from the cache into the pool
                 */
                NodePool.prototype.releaseCache = function () {
                    while (this._cacheTail) {
                        var node = this._cacheTail;
                        this._cacheTail = node.previous;
                        node.next = null;
                        node.previous = this._tail;
                        this._tail = node;
                    }
                };
                return NodePool;
            }());
            core.NodePool = NodePool;
        })(core = ash.core || (ash.core = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
