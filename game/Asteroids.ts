
import MEntityCreator = require("game/EntityCreator");

//game components
import MGameState = require("game/components/GameState");

//game systems
import MGameManager = require("game/systems/GameManager");
import MMotionControlSystem = require("game/systems/MotionControlSystem");
import MGunControlSystem = require("game/systems/GunControlSystem");
import MBulletAgeSystem = require("game/systems/BulletAgeSystem");
import MMovementSystem = require("game/systems/MovementSystem");
import MCollisionSystem = require("game/systems/CollisionSystem");
import MRenderSystem = require("game/systems/RenderSystem");
import MSystemPriorities = require("game/systems/SystemPriorities");

//core
import MEngine = require("core/Engine");
import MSystem = require("core/System");


//tools
import MDictionary = require("tools/Dictionary");
import MSignal = require("tools/Signal");
import MTickProvider = require("tools/TickProvider");
import MKeyPoll = require("tools/KeyPoll");



export class Asteroids {

    public width: number = 0;
    public height: number = 0;
    public engine: MEngine.ash.core.Engine = null;
    public gameState: MGameState.GameState = null;
    public tickProvider: MTickProvider.TickProvider = null;

    initialise(canvas: HTMLCanvasElement) {
        var canvasContext: CanvasRenderingContext2D = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.engine = new MEngine.ash.core.Engine();

        this.gameState = new MGameState.GameState(this.width, this.height);

        var keyPoll = new MKeyPoll.Keypoll();
        var creator = new MEntityCreator.EntityCreator(this.engine, canvasContext);

        this.engine.addSystem(
            new MGameManager.GameManager(this.gameState, creator),
            MSystemPriorities.SystemPriorities.preUpdate
        );
        this.engine.addSystem(
            new MMotionControlSystem.MotionControlSystem(keyPoll),
            MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MGunControlSystem.GunControlSystem(keyPoll, creator),
            MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MBulletAgeSystem.BulletAgeSystem(creator),
             MSystemPriorities.SystemPriorities.update
        );
        this.engine.addSystem(
            new MMovementSystem.MovementSystem(this.gameState),
             MSystemPriorities.SystemPriorities.move
        );
        this.engine.addSystem(
            new MCollisionSystem.CollisionSystem(creator),
             MSystemPriorities.SystemPriorities.resolveCollisions
        );
        this.engine.addSystem(
            new MRenderSystem.RenderSystem(canvasContext),
             MSystemPriorities.SystemPriorities.render
        );
        this.tickProvider = new MTickProvider.TickProvider();
    }

    start() {
        this.gameState.level = 0;
        this.gameState.lives = 3;
        this.gameState.points = 0;

        this.tickProvider.add(this.engine.update, this.engine);
        this.tickProvider.start();
    }

}
