define(["require", "exports", "game/EntityCreator", "game/components/GameState", "game/systems/GameManager", "game/systems/MotionControlSystem", "game/systems/GunControlSystem", "game/systems/BulletAgeSystem", "game/systems/MovementSystem", "game/systems/CollisionSystem", "game/systems/RenderSystem", "game/systems/SystemPriorities", "core/Engine", "tools/TickProvider", "tools/KeyPoll"], function (require, exports, MEntityCreator, MGameState, MGameManager, MMotionControlSystem, MGunControlSystem, MBulletAgeSystem, MMovementSystem, MCollisionSystem, MRenderSystem, MSystemPriorities, MEngine, MTickProvider, MKeyPoll) {
    "use strict";
    var Asteroids = (function () {
        function Asteroids() {
            this.width = 0;
            this.height = 0;
            this.engine = null;
            this.gameState = null;
            this.tickProvider = null;
        }
        Asteroids.prototype.initialise = function (canvas) {
            var canvasContext = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.engine = new MEngine.ash.core.Engine();
            this.gameState = new MGameState.GameState(this.width, this.height);
            var keyPoll = new MKeyPoll.Keypoll();
            var creator = new MEntityCreator.EntityCreator(this.engine, canvasContext);
            this.engine.addSystem(new MGameManager.GameManager(this.gameState, creator), MSystemPriorities.SystemPriorities.preUpdate);
            this.engine.addSystem(new MMotionControlSystem.MotionControlSystem(keyPoll), MSystemPriorities.SystemPriorities.update);
            this.engine.addSystem(new MGunControlSystem.GunControlSystem(keyPoll, creator), MSystemPriorities.SystemPriorities.update);
            this.engine.addSystem(new MBulletAgeSystem.BulletAgeSystem(creator), MSystemPriorities.SystemPriorities.update);
            this.engine.addSystem(new MMovementSystem.MovementSystem(this.gameState), MSystemPriorities.SystemPriorities.move);
            this.engine.addSystem(new MCollisionSystem.CollisionSystem(creator), MSystemPriorities.SystemPriorities.resolveCollisions);
            this.engine.addSystem(new MRenderSystem.RenderSystem(canvasContext), MSystemPriorities.SystemPriorities.render);
            this.tickProvider = new MTickProvider.TickProvider();
        };
        Asteroids.prototype.start = function () {
            this.gameState.level = 0;
            this.gameState.lives = 3;
            this.gameState.points = 0;
            this.tickProvider.add(this.engine.update, this.engine);
            this.tickProvider.start();
        };
        return Asteroids;
    }());
    exports.Asteroids = Asteroids;
});
