define(["require", "exports"], function (require, exports) {
    "use strict";
    var Bullet = (function () {
        function Bullet(lifeTime) {
            this.lifeTime = lifeTime;
        }
        return Bullet;
    }());
    exports.Bullet = Bullet;
});
