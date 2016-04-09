
import MSystem = require("core/System");
import MEntityCreator = require("game/EntityCreator");

import MBulletAge = require("game/nodes/BulletAge");
import MEngine = require("core/Engine");
import MNodeList = require("core/NodeList");

export class BulletAgeSystem extends MSystem.ash.core.System {

    constructor(creator) {
        super();
        this.initialise(creator);
    }

    creator: MEntityCreator.EntityCreator = null;
    nodeList: MNodeList.ash.core.NodeList<MBulletAge.BulletAge> = null;

    initialise(creator: MEntityCreator.EntityCreator) {
        this.creator = creator;
        return this;
    }

    addToEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = engine.getNodeList<MBulletAge.BulletAge>(MBulletAge.BulletAge);
    }

    removeFromEngine(engine: MEngine.ash.core.Engine) {
        this.nodeList = null;
    }

    update(time: number) {
        for (var node = this.nodeList.head; node; node = node.next) {
            this.updateNode(node, time);
        }
    }

    updateNode(node: MBulletAge.BulletAge, time: number) {
        var bullet = node.bullet;
        bullet.lifeTime -= time;
        if (bullet.lifeTime <= 0) {
            this.creator.destroyEntity(node.entity);
        }
    }

}


