var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Bullet", "game/components/Position"], function (require, exports, MNode, MBullet, MPosition) {
    "use strict";
    var BulletCollision = (function (_super) {
        __extends(BulletCollision, _super);
        function BulletCollision() {
            _super.call(this);
            this.bullet = null;
        }
        BulletCollision.types = {
            bullet: MBullet.Bullet,
            position: MPosition.Position
        };
        return BulletCollision;
    }(MNode.ash.core.Node));
    exports.BulletCollision = BulletCollision;
});
//i hope there is a better way :)
//BulletCollision.prototype.bullet = null;
//BulletCollision.prototype.position = null;
//BulletCollision.prototype.types = {
//    bullet: MBullet.Bullet,
//    position: MPosition.Position
//} 
