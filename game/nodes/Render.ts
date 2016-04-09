import MNode = require("core/Node");

import MPosition = require("game/components/Position");
import MDisplay = require("game/components/Display");

export class Render extends MNode.ash.core.Node<Render> {

    public position: MPosition.Position = null;
    public display: MDisplay.Display = null;

    public static types = {
        position: MPosition.Position,
        display: MDisplay.Display
    }

    constructor() {
        super();
    }

}


//i hope there is a better way :)
//Render.prototype.position = null;
//Render.prototype.display = null;
//Render.prototype.types = {
//    position: MPosition.Position,
//    display: MDisplay.Display
//}