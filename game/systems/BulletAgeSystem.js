var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/System", "game/nodes/BulletAge"], function (require, exports, MSystem, MBulletAge) {
    "use strict";
    var BulletAgeSystem = (function (_super) {
        __extends(BulletAgeSystem, _super);
        function BulletAgeSystem(creator) {
            _super.call(this);
            this.creator = null;
            this.nodeList = null;
            this.initialise(creator);
        }
        BulletAgeSystem.prototype.initialise = function (creator) {
            this.creator = creator;
            return this;
        };
        BulletAgeSystem.prototype.addToEngine = function (engine) {
            this.nodeList = engine.getNodeList(MBulletAge.BulletAge);
        };
        BulletAgeSystem.prototype.removeFromEngine = function (engine) {
            this.nodeList = null;
        };
        BulletAgeSystem.prototype.update = function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        };
        BulletAgeSystem.prototype.updateNode = function (node, time) {
            var bullet = node.bullet;
            bullet.lifeTime -= time;
            if (bullet.lifeTime <= 0) {
                this.creator.destroyEntity(node.entity);
            }
        };
        return BulletAgeSystem;
    }(MSystem.ash.core.System));
    exports.BulletAgeSystem = BulletAgeSystem;
});
