define(["require", "exports", "tools/Point"], function (require, exports, MPoint) {
    "use strict";
    var Position = (function () {
        function Position(x, y, rotation, collisionRadius) {
            this.rotation = rotation;
            this.collisionRadius = collisionRadius;
            this.position = null;
            this.position = new MPoint.Point(x, y);
        }
        return Position;
    }());
    exports.Position = Position;
});
