var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/System", "game/nodes/Movement"], function (require, exports, MSystem, MMovement) {
    "use strict";
    var MovementSystem = (function (_super) {
        __extends(MovementSystem, _super);
        function MovementSystem(gameState) {
            _super.call(this);
            this.gameState = null;
            this.nodeList = null;
            this.initialise(gameState);
        }
        MovementSystem.prototype.initialise = function (gameState) {
            this.gameState = gameState;
            return this;
        };
        MovementSystem.prototype.addToEngine = function (engine) {
            this.nodeList = engine.getNodeList(MMovement.Movement);
        };
        MovementSystem.prototype.removeFromEngine = function (engine) {
            this.nodeList = null;
        };
        MovementSystem.prototype.update = function (time) {
            for (var node = this.nodeList.head; node; node = node.next) {
                this.updateNode(node, time);
            }
        };
        MovementSystem.prototype.updateNode = function (node, time) {
            var position = node.position;
            var motion = node.motion;
            position.position.x += motion.velocity.x * time;
            position.position.y += motion.velocity.y * time;
            // check boundaries
            if (position.position.x < 0) {
                position.position.x += this.gameState.width;
            }
            if (position.position.x > this.gameState.width) {
                position.position.x -= this.gameState.width;
            }
            if (position.position.y < 0) {
                position.position.y += this.gameState.height;
            }
            if (position.position.y > this.gameState.height) {
                position.position.y -= this.gameState.height;
            }
            position.rotation += motion.angularVelocity * time;
            if (motion.damping > 0) {
                var xDamp = Math.abs(Math.cos(position.rotation) * motion.damping * time);
                var yDamp = Math.abs(Math.sin(position.rotation) * motion.damping * time);
                if (motion.velocity.x > xDamp) {
                    motion.velocity.x -= xDamp;
                }
                else if (motion.velocity.x < -xDamp) {
                    motion.velocity.x += xDamp;
                }
                else {
                    motion.velocity.x = 0;
                }
                if (motion.velocity.y > yDamp) {
                    motion.velocity.y -= yDamp;
                }
                else if (motion.velocity.y < -yDamp) {
                    motion.velocity.y += yDamp;
                }
                else {
                    motion.velocity.y = 0;
                }
            }
        };
        return MovementSystem;
    }(MSystem.ash.core.System));
    exports.MovementSystem = MovementSystem;
});
