var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/MotionControls", "game/components/Position", "game/components/Motion"], function (require, exports, MNode, MMotionControls, MPosition, MMotion) {
    "use strict";
    var MotionControl = (function (_super) {
        __extends(MotionControl, _super);
        function MotionControl() {
            _super.call(this);
            this.control = null;
            this.position = null;
            this.motion = null;
        }
        MotionControl.types = {
            control: MMotionControls.MotionControls,
            position: MPosition.Position,
            motion: MMotion.Motion
        };
        return MotionControl;
    }(MNode.ash.core.Node));
    exports.MotionControl = MotionControl;
});
//i hope there is a better way :)
//MotionControl.prototype.control = null;
//MotionControl.prototype.position = null;
//MotionControl.prototype.motion = null;
//MotionControl.prototype.types = {
//    control: MMotionControls.MotionControls,
//    position: MPosition.Position,
//    motion: MMotion.Motion
//} 
