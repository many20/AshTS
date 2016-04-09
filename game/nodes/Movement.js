var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Position", "game/components/Motion"], function (require, exports, MNode, MPosition, MMotion) {
    "use strict";
    var Movement = (function (_super) {
        __extends(Movement, _super);
        function Movement() {
            _super.call(this);
            this.position = null;
            this.motion = null;
        }
        Movement.types = {
            position: MPosition.Position,
            motion: MMotion.Motion
        };
        return Movement;
    }(MNode.ash.core.Node));
    exports.Movement = Movement;
});
//i hope there is a better way :)
//Movement.prototype.motion = null;
//Movement.prototype.position = null;
//Movement.prototype.types = {
//    position: MPosition.Position,
//    motion: MMotion.Motion
//} 
