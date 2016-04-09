define(["require", "exports", "tools/Point"], function (require, exports, MPoint) {
    "use strict";
    var Gun = (function () {
        function Gun(offsetX, offsetY, minimumShotInterval, bulletLifetime) {
            this.minimumShotInterval = minimumShotInterval;
            this.bulletLifetime = bulletLifetime;
            this.shooting = false;
            this.timeSinceLastShot = 0;
            this.offsetFromParent = null;
            this.offsetFromParent = new MPoint.Point(offsetX, offsetY);
        }
        return Gun;
    }());
    exports.Gun = Gun;
});
