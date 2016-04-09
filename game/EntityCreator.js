define(["require", "exports", "core/Entity", "tools/KeyPoll", "game/components/Asteroid", "game/components/Spaceship", "game/components/Bullet", "game/components/Position", "game/components/Motion", "game/components/MotionControls", "game/components/Gun", "game/components/GunControls", "game/components/Display", "game/graphics/AsteroidView", "game/graphics/SpaceshipView", "game/graphics/BulletView"], function (require, exports, MEntity, MKeyPoll, MAsteroid, MSpaceship, MBullet, MPosition, MMotion, MMotionControls, MGun, MGunControls, MDisplay, MAsteroidView, MSpaceshipView, MBulletView) {
    "use strict";
    var EntityCreator = (function () {
        function EntityCreator(game, graphics) {
            this.game = null;
            this.graphics = null;
            this.initialise(game, graphics);
        }
        EntityCreator.prototype.initialise = function (game, graphics) {
            this.game = game;
            this.graphics = graphics;
            return this;
        };
        EntityCreator.prototype.destroyEntity = function (entity) {
            this.game.removeEntity(entity);
        };
        EntityCreator.prototype.createAsteroid = function (radius, x, y) {
            var asteroid = new MEntity.ash.core.Entity()
                .add(new MAsteroid.Asteroid())
                .add(new MPosition.Position(x, y, 0, radius))
                .add(new MMotion.Motion((Math.random() - 0.5) * 4 * (50 - radius), (Math.random() - 0.5) * 4 * (50 - radius), Math.random() * 2 - 1, 0))
                .add(new MDisplay.Display(new MAsteroidView.AsteroidView(radius, this.graphics)));
            this.game.addEntity(asteroid);
            return asteroid;
        };
        EntityCreator.prototype.createSpaceship = function () {
            var spaceship = new MEntity.ash.core.Entity()
                .add(new MSpaceship.Spaceship())
                .add(new MPosition.Position(400, 300, 1, 6))
                .add(new MMotion.Motion(0, 0, 0, 15))
                .add(new MMotionControls.MotionControls(MKeyPoll.Keyboard.keyboard.LEFT, MKeyPoll.Keyboard.keyboard.RIGHT, MKeyPoll.Keyboard.keyboard.UP, 100, 3))
                .add(new MGun.Gun(8, 0, 0.3, 2))
                .add(new MGunControls.GunControls(MKeyPoll.Keyboard.keyboard.Z))
                .add(new MDisplay.Display(new MSpaceshipView.SpaceshipView(this.graphics)));
            this.game.addEntity(spaceship);
            return spaceship;
        };
        EntityCreator.prototype.createUserBullet = function (gun, parentPosition) {
            var cos = Math.cos(parentPosition.rotation);
            var sin = Math.sin(parentPosition.rotation);
            var bullet = new MEntity.ash.core.Entity()
                .add(new MBullet.Bullet(gun.bulletLifetime))
                .add(new MPosition.Position(cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x, sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0))
                .add(new MMotion.Motion(cos * 150, sin * 150, 0, 0))
                .add(new MDisplay.Display(new MBulletView.BulletView(this.graphics)));
            this.game.addEntity(bullet);
            return bullet;
        };
        return EntityCreator;
    }());
    exports.EntityCreator = EntityCreator;
});
