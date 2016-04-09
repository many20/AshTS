define(["require", "exports"], function (require, exports) {
    "use strict";
    var ash;
    (function (ash) {
        var core;
        (function (core) {
            /**
             * An export class for a linked list of entities. Used inside the framework for
             * managing the entities.
             */
            var EntityList = (function () {
                function EntityList() {
                }
                EntityList.prototype.add = function (entity) {
                    if (!this.head) {
                        this.head = this.tail = entity;
                        entity.next = entity.previous = null;
                    }
                    else {
                        this.tail.next = entity;
                        entity.previous = this.tail;
                        entity.next = null;
                        this.tail = entity;
                    }
                };
                EntityList.prototype.remove = function (entity) {
                    if (this.head === entity) {
                        this.head = this.head.next;
                    }
                    if (this.tail === entity) {
                        this.tail = this.tail.previous;
                    }
                    if (entity.previous) {
                        entity.previous.next = entity.next;
                    }
                    if (entity.next) {
                        entity.next.previous = entity.previous;
                    }
                    // N.B. Don't set node.next and node.previous to null because that will break the list iteration if node is the current node in the iteration.
                };
                EntityList.prototype._removeAll = function () {
                    while (this.head) {
                        var entity = this.head;
                        this.head = this.head.next;
                        entity.previous = null;
                        entity.next = null;
                    }
                    this.tail = null;
                };
                return EntityList;
            }());
            core.EntityList = EntityList;
        })(core = ash.core || (ash.core = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
