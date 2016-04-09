import MNode = require("core/Node");

import MPosition = require("game/components/Position");
import MMotion = require("game/components/Motion");

export class Movement extends MNode.ash.core.Node<Movement> {

    public position: MPosition.Position = null;
    public motion: MMotion.Motion = null;

    public static types = {
        position: MPosition.Position,
        motion: MMotion.Motion
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//Movement.prototype.motion = null;
//Movement.prototype.position = null;
//Movement.prototype.types = {
//    position: MPosition.Position,
//    motion: MMotion.Motion
//}