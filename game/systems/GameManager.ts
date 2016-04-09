import MSystem = require("core/System");
import MEntityCreator = require("game/EntityCreator");

import MEngine = require("core/Engine");

import MGameState = require("game/components/GameState");
import MNodeList = require("core/NodeList");

import MSpaceShipCollision = require("game/nodes/SpaceShipCollision");
import MAsteroidCollision = require("game/nodes/AsteroidCollision");
import MBulletCollision = require("game/nodes/BulletCollision");

import MPoint = require("tools/Point");

export class GameManager extends MSystem.ash.core.System {

    constructor(gameState: MGameState.GameState, creator: MEntityCreator.EntityCreator) {
        super();
        this.initialise(gameState, creator);
    }

    public gameState: MGameState.GameState = null;
    public creator: MEntityCreator.EntityCreator = null;
    public spaceships: MNodeList.ash.core.NodeList<MSpaceShipCollision.SpaceshipCollision> = null;
    public asteroids: MNodeList.ash.core.NodeList<MAsteroidCollision.AsteroidCollision> = null;
    public bullets: MNodeList.ash.core.NodeList<MBulletCollision.BulletCollision> = null;

    public initialise(gameState: MGameState.GameState, creator: MEntityCreator.EntityCreator) {
        this.gameState = gameState;
        this.creator = creator;
        return this;
    }

    public addToEngine(game: MEngine.ash.core.Engine) {
        this.spaceships = game.getNodeList<MSpaceShipCollision.SpaceshipCollision>(MSpaceShipCollision.SpaceshipCollision);
        this.asteroids = game.getNodeList<MAsteroidCollision.AsteroidCollision>(MAsteroidCollision.AsteroidCollision);
        this.bullets = game.getNodeList<MBulletCollision.BulletCollision>(MBulletCollision.BulletCollision);
    }

    public update(time: number) {
        if (this.spaceships.empty()) {
            if (this.gameState.lives > 0) {
                var newSpaceshipPosition = new MPoint.Point(this.gameState.width * 0.5, this.gameState.height * 0.5);
                var clearToAddSpaceship = true;
                for (var asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(newSpaceshipPosition) <= asteroid.position.collisionRadius + 50) {
                        clearToAddSpaceship = false;
                        break;
                    }
                }
                if (clearToAddSpaceship) {
                    this.creator.createSpaceship();
                    this.gameState.lives--;
                }
            }
            else {
                // game over
            }
        }

        if (this.asteroids.empty() && this.bullets.empty() && !this.spaceships.empty()) {
            // next level
            var spaceship = this.spaceships.head;
            this.gameState.level++;
            var asteroidCount = 2 + this.gameState.level;
            for (var i = 0; i < asteroidCount; ++i) {
                // check not on top of spaceship
                do {
                    var position = new MPoint.Point(
                        Math.random() * this.gameState.width,
                        Math.random() * this.gameState.height
                    );
                }
                while (position.distanceTo(spaceship.position.position) <= 80);
                this.creator.createAsteroid(30, position.x, position.y);
            }
        }
    }

    public removeFromEngine(game: MEngine.ash.core.Engine) {
        this.spaceships = null;
        this.asteroids = null;
        this.bullets = null;
    }
}
