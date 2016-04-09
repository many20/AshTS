var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "core/System", "game/nodes/SpaceShipCollision", "game/nodes/AsteroidCollision", "game/nodes/BulletCollision"], function (require, exports, MSystem, MSpaceShipCollision, MAsteroidCollision, MBulletCollision) {
    "use strict";
    var CollisionSystem = (function (_super) {
        __extends(CollisionSystem, _super);
        function CollisionSystem(creator) {
            _super.call(this);
            this.creator = null;
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
            this.initialise(creator);
        }
        CollisionSystem.prototype.initialise = function (creator) {
            this.creator = creator;
            return this;
        };
        CollisionSystem.prototype.addToEngine = function (game) {
            this.spaceships = game.getNodeList(MSpaceShipCollision.SpaceshipCollision);
            this.asteroids = game.getNodeList(MAsteroidCollision.AsteroidCollision);
            this.bullets = game.getNodeList(MBulletCollision.BulletCollision);
        };
        CollisionSystem.prototype.removeFromEngine = function (game) {
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
        };
        CollisionSystem.prototype.update = function (time) {
            var bullet, asteroid, spaceship;
            for (bullet = this.bullets.head; bullet; bullet = bullet.next) {
                for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(bullet.position.position) <= asteroid.position.collisionRadius) {
                        this.creator.destroyEntity(bullet.entity);
                        if (asteroid.position.collisionRadius > 20) {
                            for (var pieces = 0; pieces < 8; pieces += 1) {
                                this.creator.createAsteroid(asteroid.position.collisionRadius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
                            }
                        }
                        if (asteroid.position.collisionRadius > 10) {
                            for (var pieces2 = 0; pieces2 < 2; pieces2 += 1) {
                                this.creator.createAsteroid(asteroid.position.collisionRadius - 10, asteroid.position.position.x + Math.random() * 10 - 5, asteroid.position.position.y + Math.random() * 10 - 5);
                            }
                        }
                        this.creator.destroyEntity(asteroid.entity);
                        break;
                    }
                }
            }
            for (spaceship = this.spaceships.head; spaceship; spaceship = spaceship.next) {
                for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(spaceship.position.position) <= asteroid.position.collisionRadius + spaceship.position.collisionRadius) {
                        this.creator.destroyEntity(spaceship.entity);
                        break;
                    }
                }
            }
        };
        return CollisionSystem;
    }(MSystem.ash.core.System));
    exports.CollisionSystem = CollisionSystem;
});
