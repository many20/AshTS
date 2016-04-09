define(["require", "exports"], function (require, exports) {
    "use strict";
    var MotionControls = (function () {
        function MotionControls(left, right, accelerate, accelerationRate, rotationRate) {
            this.left = left;
            this.right = right;
            this.accelerate = accelerate;
            this.accelerationRate = accelerationRate;
            this.rotationRate = rotationRate;
        }
        return MotionControls;
    }());
    exports.MotionControls = MotionControls;
});
