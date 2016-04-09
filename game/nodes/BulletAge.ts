import MNode = require("core/Node");

import MBullet = require("game/components/Bullet");

export class BulletAge extends MNode.ash.core.Node<BulletAge> {

    public bullet: MBullet.Bullet = null;

    public static types = {
        bullet: MBullet.Bullet
    };

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//BulletAge.prototype.bullet = null;
//BulletAge.prototype.types = {
//    bullet: MBullet.Bullet
//}