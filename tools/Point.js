define(["require", "exports"], function (require, exports) {
    "use strict";
    // Class
    var Point = (function () {
        // Constructor
        function Point(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            this.x = x;
            this.y = y;
        }
        Point.prototype.distanceSquaredTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y;
            return dx * dx + dy * dy;
        };
        Point.prototype.distanceTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        return Point;
    }());
    exports.Point = Point;
    // Class
    var Point3D = (function () {
        // Constructor
        function Point3D(x, y, z) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Point3D.prototype.distanceSquaredTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y, dz = this.y - targetPoint.z;
            return dx * dx + dy * dy + dz * dz;
        };
        Point3D.prototype.distanceTo = function (targetPoint) {
            var dx = this.x - targetPoint.x, dy = this.y - targetPoint.y, dz = this.z - targetPoint.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        };
        return Point3D;
    }());
    exports.Point3D = Point3D;
});
