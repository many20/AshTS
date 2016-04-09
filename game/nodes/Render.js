var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Position", "game/components/Display"], function (require, exports, MNode, MPosition, MDisplay) {
    "use strict";
    var Render = (function (_super) {
        __extends(Render, _super);
        function Render() {
            _super.call(this);
            this.position = null;
            this.display = null;
        }
        Render.types = {
            position: MPosition.Position,
            motion: MDisplay.Display
        };
        return Render;
    }(MNode.ash.core.Node));
    exports.Render = Render;
});
//i hope there is a better way :)
//Render.prototype.position = null;
//Render.prototype.display = null;
//Render.prototype.types = {
//    position: MPosition.Position,
//    motion: MDisplay.Display
//} 
