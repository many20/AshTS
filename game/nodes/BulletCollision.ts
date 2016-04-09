import MNode = require("core/Node");

import MBullet = require("game/components/Bullet");
import MPosition = require("game/components/Position");

export class BulletCollision extends MNode.ash.core.Node<BulletCollision> {

    public bullet: MBullet.Bullet = null;
    public position: MPosition.Position;

    public static types = {
        bullet: MBullet.Bullet,
        position: MPosition.Position
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//BulletCollision.prototype.bullet = null;
//BulletCollision.prototype.position = null;
//BulletCollision.prototype.types = {
//    bullet: MBullet.Bullet,
//    position: MPosition.Position
//}