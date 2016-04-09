
import MSystem = require("core/System");
import MEngine = require("core/Engine");
import MEntityCreator = require("game/EntityCreator");
import MNodeList = require("core/NodeList");

import MGunControl = require("game/nodes/GunControl");
import MKeyPoll = require("tools/KeyPoll");

export class GunControlSystem extends MSystem.ash.core.System {

    constructor(keyPoll: MKeyPoll.Keypoll, creator: MEntityCreator.EntityCreator) {
        super();
        this.initialise(keyPoll, creator);
    }

    public keyPoll: MKeyPoll.Keypoll = null;
    public creator: MEntityCreator.EntityCreator = null;
    public nodeList: MNodeList.ash.core.NodeList<MGunControl.GunControl> = null;

    public initialise(keyPoll: MKeyPoll.Keypoll, creator: MEntityCreator.EntityCreator) {
        this.keyPoll = keyPoll;
        this.creator = creator;
        return this;
    }

    public addToEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = engine.getNodeList<MGunControl.GunControl>(MGunControl.GunControl);
    }

    public removeFromEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = null;
    }

    public update(time: number) {
        for (var node = this.nodeList.head; node; node = node.next) {
            this.updateNode(node, time);
        }
    }

    public updateNode(node: MGunControl.GunControl, time: number) {
        var control = node.control,
            position = node.position,
            gun = node.gun;

        gun.shooting = this.keyPoll.isDown(control.trigger);
        gun.timeSinceLastShot += time;
        if (gun.shooting && gun.timeSinceLastShot >= gun.minimumShotInterval) {
            this.creator.createUserBullet(gun, position);
            gun.timeSinceLastShot = 0;
        }
    }

}