define(["require", "exports"], function (require, exports) {
    "use strict";
    var ash;
    (function (ash) {
        var core;
        (function (core) {
            /**
             * The base class for a node.
             *
             * <p>A node is a set of different components that are required by a system.
             * A system can request a collection of nodes from the engine. Subsequently the Engine object creates
             * a node for every entity that has all of the components in the node class and adds these nodes
             * to the list obtained by the system. The engine keeps the list up to date as entities are added
             * to and removed from the engine and as the components on entities change.</p>
             */
            var Node = (function () {
                function Node() {
                    /**
                     * The entity whose components are included in the node.
                     */
                    this.entity = null;
                    /**
                     * Used by the NodeList class. The previous node in a node list.
                     */
                    this.previous = null;
                    /**
                     * Used by the NodeList class. The next node in a node list.
                     */
                    this.next = null;
                }
                Node.prototype.types = function () {
                    return [];
                };
                return Node;
            }());
            core.Node = Node;
        })(core = ash.core || (ash.core = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
