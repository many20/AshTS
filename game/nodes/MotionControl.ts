import MNode = require("core/Node");

import MMotionControls = require("game/components/MotionControls");
import MPosition = require("game/components/Position");
import MMotion = require("game/components/Motion");

export class MotionControl extends MNode.ash.core.Node<MotionControl> {

    public control: MMotionControls.MotionControls = null;
    public position: MPosition.Position = null;
    public motion: MMotion.Motion = null;

    public static types = {
        control: MMotionControls.MotionControls,
        position: MPosition.Position,
        motion: MMotion.Motion
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//MotionControl.prototype.control = null;
//MotionControl.prototype.position = null;
//MotionControl.prototype.motion = null;
//MotionControl.prototype.types = {
//    control: MMotionControls.MotionControls,
//    position: MPosition.Position,
//    motion: MMotion.Motion
//}