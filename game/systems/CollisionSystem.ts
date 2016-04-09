
import MSystem = require("core/System");
import MEngine = require("core/Engine");
import MEntityCreator = require("game/EntityCreator");

import MNodeList = require("core/NodeList");

import MSpaceShipCollision = require("game/nodes/SpaceShipCollision");
import MAsteroidCollision = require("game/nodes/AsteroidCollision");
import MBulletCollision = require("game/nodes/BulletCollision");

export class CollisionSystem extends MSystem.ash.core.System {

    constructor(creator: MEntityCreator.EntityCreator) {
        super();
        this.initialise(creator);
    }

    public creator: MEntityCreator.EntityCreator = null;
    public spaceships: MNodeList.ash.core.NodeList<MSpaceShipCollision.SpaceshipCollision> = null;
    public asteroids: MNodeList.ash.core.NodeList<MAsteroidCollision.AsteroidCollision> = null;
    public bullets: MNodeList.ash.core.NodeList<MBulletCollision.BulletCollision> = null;

    public initialise(creator: MEntityCreator.EntityCreator) {
        this.creator = creator;
        return this;
    }

    public addToEngine(game: MEngine.ash.core.Engine) {
        this.spaceships = game.getNodeList<MSpaceShipCollision.SpaceshipCollision>(MSpaceShipCollision.SpaceshipCollision);
        this.asteroids = game.getNodeList<MAsteroidCollision.AsteroidCollision>(MAsteroidCollision.AsteroidCollision);
        this.bullets = game.getNodeList<MBulletCollision.BulletCollision>(MBulletCollision.BulletCollision);
    }

    public removeFromEngine(game: MEngine.ash.core.Engine) {
        this.spaceships = null;
        this.asteroids = null;
        this.bullets = null;
    }

    public update(time: number) {
        var bullet,
            asteroid,
            spaceship;

        for (bullet = this.bullets.head; bullet; bullet = bullet.next) {
            for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                if (asteroid.position.position.distanceTo(bullet.position.position) <= asteroid.position.collisionRadius) {
                    this.creator.destroyEntity(bullet.entity);
                    if (asteroid.position.collisionRadius > 20) {
                        for (var pieces = 0; pieces < 8; pieces += 1) {
                            this.creator.createAsteroid(
                                asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5
                            );
                        }
                    }
                    if (asteroid.position.collisionRadius > 10) {
                        for (var pieces2 = 0; pieces2 < 2; pieces2 += 1) {
                            this.creator.createAsteroid(
                                asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5
                            );
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
    }

}
