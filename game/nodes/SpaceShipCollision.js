var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Spaceship", "game/components/Position"], function (require, exports, MNode, MSpaceship, MPosition) {
    "use strict";
    var SpaceshipCollision = (function (_super) {
        __extends(SpaceshipCollision, _super);
        function SpaceshipCollision() {
            _super.call(this);
            this.spaceship = null;
            this.position = null;
        }
        SpaceshipCollision.types = {
            spaceship: MSpaceship.Spaceship,
            position: MPosition.Position
        };
        return SpaceshipCollision;
    }(MNode.ash.core.Node));
    exports.SpaceshipCollision = SpaceshipCollision;
});
//i hope there is a better way :)
//SpaceshipCollision.prototype.spaceship = null;
//SpaceshipCollision.prototype.position = null;
//SpaceshipCollision.prototype.types = {
//    spaceship: MSpaceship.Spaceship,
//    position: MPosition.Position
//} 
