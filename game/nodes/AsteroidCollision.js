var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/Node", "game/components/Asteroid", "game/components/Position"], function (require, exports, MNode, MAsteroid, MPosition) {
    "use strict";
    var AsteroidCollision = (function (_super) {
        __extends(AsteroidCollision, _super);
        function AsteroidCollision() {
            _super.call(this);
            this.asteroid = null;
            this.position = null;
        }
        AsteroidCollision.types = {
            asteroid: MAsteroid.Asteroid,
            position: MPosition.Position
        };
        return AsteroidCollision;
    }(MNode.ash.core.Node));
    exports.AsteroidCollision = AsteroidCollision;
});
//i hope there is a better way :)
//AsteroidCollision.prototype.asteroid = null;
//AsteroidCollision.prototype.position = null;
//AsteroidCollision.prototype.types = {
//    asteroid: MAsteroid.Asteroid,
//    position: MPosition.Position
//} 
