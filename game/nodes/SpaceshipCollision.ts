import MNode = require("core/Node");

import MSpaceship = require("game/components/Spaceship");
import MPosition = require("game/components/Position");

export class SpaceshipCollision extends MNode.ash.core.Node<SpaceshipCollision> {

    public spaceship: MSpaceship.Spaceship = null;
    public position: MPosition.Position = null;

    public static  types: any = {
        spaceship: MSpaceship.Spaceship,
        position: MPosition.Position
    }

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//SpaceshipCollision.prototype.spaceship = null;
//SpaceshipCollision.prototype.position = null;
//SpaceshipCollision.prototype.types = {
//    spaceship: MSpaceship.Spaceship,
//    position: MPosition.Position
//}