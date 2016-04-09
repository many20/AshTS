import MSystem = require("core/System");
import MEngine = require("core/Engine");
import MNode = require("core/Node");

import MRender = require("game/nodes/Render");
import MNodeList = require("core/NodeList");

import MPosition = require("game/components/Position");
import MDisplay = require("game/components/Display");
import View = require("core/IView");


export class RenderSystem extends MSystem.ash.core.System {

    constructor(graphicsContext: CanvasRenderingContext2D) {
        super();
        this.initialise(graphicsContext);
    }

    public context: CanvasRenderingContext2D = null;
    public nodes: MNodeList.ash.core.NodeList<MRender.Render> = null;

    private _count = 0;

    public initialise(graphicsContext: CanvasRenderingContext2D) {
        this.context = graphicsContext;
        return this;
    }

    public addToEngine(engine: MEngine.ash.core.Engine) {
        this.nodes = engine.getNodeList<MRender.Render>(MRender.Render);
        for (var node = this.nodes.head; node; node = node.next) {
            this.addToDisplay(node);
        }
        this.nodes.nodeAdded.add(this.addToDisplay, this);
        this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
    }

    public removeFromEngine(engine: MEngine.ash.core.Engine) {
        this.nodes = null;
    }

    public addToDisplay(node: MRender.Render) {
        // Intentionally left blank
    }

    public removeFromDisplay(node: MRender.Render) {
        // Intentionally left blank
    }

    public update(time: number) {

        var position: MPosition.Position;
        var display: MDisplay.Display;
        var graphic: View.ash.core.IView;

        this.context.save();
        this.context.translate(0, 0);
        this.context.rotate(0);
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        for (var node = this.nodes.head; node; node = node.next) {

            display = node.display;
            graphic = display.graphic;
            position = node.position;

            graphic.x = position.position.x;
            graphic.y = position.position.y;
            graphic.rotation = position.rotation;
            graphic.draw();
        }
        this.context.restore();
    }

}