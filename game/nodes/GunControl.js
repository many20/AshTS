var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/GunControls", "game/components/Gun", "game/components/Position"], function (require, exports, MNode, MGunControls, MGun, MPosition) {
    "use strict";
    var GunControl = (function (_super) {
        __extends(GunControl, _super);
        function GunControl() {
            _super.call(this);
            this.control = null;
            this.gun = null;
            this.position = null;
        }
        GunControl.types = {
            control: MGunControls.GunControls,
            gun: MGun.Gun,
            position: MPosition.Position
        };
        return GunControl;
    }(MNode.ash.core.Node));
    exports.GunControl = GunControl;
});
//i hope there is a better way :)
//GunControl.prototype.control = null;
//GunControl.prototype.gun = null;
//GunControl.prototype.position = null;
//GunControl.prototype.types = {
//    control: MGunControls.GunControls,
//    gun: MGun.Gun,
//    position: MPosition.Position
//} 
