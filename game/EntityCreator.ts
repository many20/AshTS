
//core
import MEntity = require("core/Entity");

//tools
import MKeyPoll = require("tools/KeyPoll");


//game components
import MAsteroid = require("game/components/Asteroid");
import MSpaceship = require("game/components/Spaceship");
import MBullet = require("game/components/Bullet");
import MPosition = require("game/components/Position");
import MMotion = require("game/components/Motion");
import MMotionControls = require("game/components/MotionControls");
import MGun = require("game/components/Gun");
import MGunControls = require("game/components/GunControls");
import MDisplay = require("game/components/Display");

//graphics
import MAsteroidView = require("game/graphics/AsteroidView");
import MSpaceshipView = require("game/graphics/SpaceshipView");
import MBulletView = require("game/graphics/BulletView");

//core
import MEngine = require("core/Engine");


export class EntityCreator {

    public game: MEngine.ash.core.Engine = null;
    public graphics: CanvasRenderingContext2D = null;

    constructor(game: MEngine.ash.core.Engine, graphics: CanvasRenderingContext2D) {
        this.initialise(game, graphics);
    }

    public initialise(game: MEngine.ash.core.Engine, graphics: CanvasRenderingContext2D) {
        this.game = game;
        this.graphics = graphics;
        return this;
    }

    public destroyEntity(entity: MEntity.ash.core.Entity) {
        this.game.removeEntity(entity);
    }

    public createAsteroid(radius: number, x: number, y: number) {
        var asteroid = new MEntity.ash.core.Entity()
            .add(new MAsteroid.Asteroid())
            .add(new MPosition.Position(x, y, 0, radius))
            .add(
                new MMotion.Motion(
                    (Math.random() - 0.5) * 4 * (50 - radius),
                    (Math.random() - 0.5) * 4 * (50 - radius),
                    Math.random() * 2 - 1,
                    0
                )
            )
            .add(new MDisplay.Display(new MAsteroidView.AsteroidView(radius, this.graphics)));
        this.game.addEntity(asteroid);
        return asteroid;
    }

    public createSpaceship() {
        var spaceship = new MEntity.ash.core.Entity()
            .add(new MSpaceship.Spaceship())
            .add(new MPosition.Position(400, 300, 1, 6))
            .add(new MMotion.Motion(0, 0, 0, 15))
            .add(
            new MMotionControls.MotionControls(
                    MKeyPoll.Keyboard.keyboard.LEFT,
                     MKeyPoll.Keyboard.keyboard.RIGHT,
                    MKeyPoll.Keyboard.keyboard.UP,
                    100,
                    3
                )
            )
            .add(new MGun.Gun(8, 0, 0.3, 2))
            .add(new MGunControls.GunControls(MKeyPoll.Keyboard.keyboard.Z))
            .add(new MDisplay.Display(new MSpaceshipView.SpaceshipView(this.graphics)));
        this.game.addEntity(spaceship);
        return spaceship;
    }

    public createUserBullet(gun, parentPosition) {
        var cos = Math.cos(parentPosition.rotation);
        var sin = Math.sin(parentPosition.rotation);
        var bullet = new MEntity.ash.core.Entity()
            .add(new MBullet.Bullet(gun.bulletLifetime))
            .add(new MPosition.Position(
                cos * gun.offsetFromParent.x - sin * gun.offsetFromParent.y + parentPosition.position.x,
                sin * gun.offsetFromParent.x + cos * gun.offsetFromParent.y + parentPosition.position.y, 0, 0))
            .add(new MMotion.Motion(cos * 150, sin * 150, 0, 0))
            .add(new MDisplay.Display(new MBulletView.BulletView(this.graphics)));
        this.game.addEntity(bullet);
        return bullet;
    }
}