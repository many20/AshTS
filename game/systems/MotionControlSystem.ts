
import MSystem = require("core/System");
import MEngine = require("core/Engine");
import MNodeList = require("core/NodeList");

import MMotionControl = require("game/nodes/MotionControl");
import MKeyPoll = require("tools/KeyPoll");

export class MotionControlSystem extends MSystem.ash.core.System {

    constructor(keyPoll: MKeyPoll.Keypoll) {
        super();
        this.initialise(keyPoll);
    }

    public keyPoll: MKeyPoll.Keypoll = null;
    public nodeList: MNodeList.ash.core.NodeList<MMotionControl.MotionControl> = null;

    public initialise(keyPoll: MKeyPoll.Keypoll) {
        this.keyPoll = keyPoll;
        return this;
    }

    public addToEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = engine.getNodeList<MMotionControl.MotionControl>(MMotionControl.MotionControl);
    }

    public removeFromEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = null;
    }

    public update(time: number) {
        for (var node = this.nodeList.head; node; node = node.next) {
            this.updateNode(node, time);
        }
    }

    public updateNode(node: MMotionControl.MotionControl, time: number) {
        var control = node.control;
        var position = node.position;
        var motion = node.motion;

        if (this.keyPoll.isDown(control.left)) {
            position.rotation -= control.rotationRate * time;
        }
        if (this.keyPoll.isDown(control.right)) {
            position.rotation += control.rotationRate * time;
        }
        if (this.keyPoll.isDown(control.accelerate)) {
            motion.velocity.x += Math.cos(position.rotation) * control.accelerationRate * time;
            motion.velocity.y += Math.sin(position.rotation) * control.accelerationRate * time;
        }
    }

}
