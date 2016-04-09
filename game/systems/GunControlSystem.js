var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/System", "game/nodes/GunControl"], function (require, exports, MSystem, MGunControl) {
    "use strict";
    var GunControlSystem = (function (_super) {
        __extends(GunControlSystem, _super);
        function GunControlSystem(keyPoll, creator) {
            _super.call(this);
            this.keyPoll = null;
            this.creator = null;
            this.nodeList = null;
            this.initialise(keyPoll, creator);
        }
        GunControlSystem.prototype.initialise = function (keyPoll, creator) {
            this.keyPoll = keyPoll;
            this.creator = creator;
            return this;
        };
        GunControlSystem.prototype.addToEngine = function (engine) {
            this.nodeList = engine.getNodeList(MGunControl.GunControl);
        };
        GunControlSystem.prototype.removeFromEngine = function (engine) {
            this.nodeList = null;
        };
        GunControlSystem.prototype.update = function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        };
        GunControlSystem.prototype.updateNode = function (node, time) {
            var control = node.control, position = node.position, gun = node.gun;
            gun.shooting = this.keyPoll.isDown(control.trigger);
            gun.timeSinceLastShot += time;
            if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
                this.creator.createUserBullet(gun, position);
                gun.timeSinceLastShot = 0;
            }
        };
        return GunControlSystem;
    }(MSystem.ash.core.System));
    exports.GunControlSystem = GunControlSystem;
});
