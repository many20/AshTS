import MNode = require("core/Node");

import MGunControls = require("game/components/GunControls");
import MGun = require("game/components/Gun");
import MPosition = require("game/components/Position");

export class GunControl extends MNode.ash.core.Node<GunControl> {

    public control: MGunControls.GunControls = null;
    public gun: MGun.Gun = null;
    public position: MPosition.Position = null;

    public static types = {
        control: MGunControls.GunControls,
        gun: MGun.Gun,
        position: MPosition.Position
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//GunControl.prototype.control = null;
//GunControl.prototype.gun = null;
//GunControl.prototype.position = null;
//GunControl.prototype.types = {
//    control: MGunControls.GunControls,
//    gun: MGun.Gun,
//    position: MPosition.Position
//}