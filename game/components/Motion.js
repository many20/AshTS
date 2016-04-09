define(["require", "exports", "tools/Point"], function (require, exports, MPoint) {
    "use strict";
    var Motion = (function () {
        function Motion(velocityX, velocityY, angularVelocity, damping) {
            this.angularVelocity = angularVelocity;
            this.damping = damping;
            this.velocity = null;
            this.velocity = new MPoint.Point(velocityX, velocityY);
        }
        return Motion;
    }());
    exports.Motion = Motion;
});
