var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Bullet"], function (require, exports, MNode, MBullet) {
    "use strict";
    var BulletAge = (function (_super) {
        __extends(BulletAge, _super);
        function BulletAge() {
            _super.call(this);
            this.bullet = null;
        }
        BulletAge.types = {
            bullet: MBullet.Bullet
        };
        return BulletAge;
    }(MNode.ash.core.Node));
    exports.BulletAge = BulletAge;
});
//i hope there is a better way :)
//BulletAge.prototype.bullet = null;
//BulletAge.prototype.types = {
//    bullet: MBullet.Bullet
//} 
