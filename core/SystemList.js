define(["require", "exports"], function (require, exports) {
    "use strict";
    var ash;
    (function (ash) {
        var core;
        (function (core) {
            /**
             * Used internally, this is an ordered list of Systems for use by the engine update loop.
             */
            var SystemList = (function () {
                function SystemList() {
                }
                SystemList.prototype.add = function (system) {
                    if (!this.head) {
                        this.head = this.tail = system;
                        system.next = system.previous = null;
                    }
                    else {
                        var node;
                        for (node = this.tail; node; node = node.previous) {
                            if (node.priority <= system.priority) {
                                break;
                            }
                        }
                        if (node === this.tail) {
                            this.tail.next = system;
                            system.previous = this.tail;
                            system.next = null;
                            this.tail = system;
                        }
                        else if (!node) {
                            system.next = this.head;
                            system.previous = null;
                            this.head.previous = system;
                            this.head = system;
                        }
                        else {
                            system.next = node.next;
                            system.previous = node;
                            node.next.previous = system;
                            node.next = system;
                        }
                    }
                };
                SystemList.prototype.remove = function (system) {
                    if (this.head === system) {
                        this.head = this.head.next;
                    }
                    if (this.tail === system) {
                        this.tail = this.tail.previous;
                    }
                    if (system.previous) {
                        system.previous.next = system.next;
                    }
                    if (system.next) {
                        system.next.previous = system.previous;
                    }
                    // N.B. Don't set system.next and system.previous to null because that will break the list iteration if node is the current node in the iteration.
                };
                SystemList.prototype.removeAll = function () {
                    while (this.head) {
                        var system = this.head;
                        this.head = this.head.next;
                        system.previous = null;
                        system.next = null;
                    }
                    this.tail = null;
                };
                SystemList.prototype.get = function (type) {
                    for (var system = this.head; system; system = system.next) {
                        if (system.is(type)) {
                            return system;
                        }
                    }
                    return null;
                };
                return SystemList;
            }());
            core.SystemList = SystemList;
        })(core = ash.core || (ash.core = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
