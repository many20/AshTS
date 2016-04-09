define(["require", "exports"], function (require, exports) {
    "use strict";
    var SystemPriorities = (function () {
        function SystemPriorities() {
        }
        SystemPriorities.preUpdate = 1;
        SystemPriorities.update = 2;
        SystemPriorities.move = 3;
        SystemPriorities.resolveCollisions = 4;
        //public static stateMachines: number = 5;
        //public static animate: number = 6;
        SystemPriorities.render = 5;
        return SystemPriorities;
    }());
    exports.SystemPriorities = SystemPriorities;
});
