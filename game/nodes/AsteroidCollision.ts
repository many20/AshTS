import MNode = require("core/Node");
import MComponents = require("core/Components");

import MAsteroid = require("game/components/Asteroid");
import MPosition = require("game/components/Position");

export class AsteroidCollision extends MNode.ash.core.Node<AsteroidCollision> {

    public asteroid = null;
    public position = null;

    public static types = {
        asteroid: MAsteroid.Asteroid,
        position: MPosition.Position
    };

    constructor() {
        super();
    }

}

//i hope there is a better way :)
//AsteroidCollision.prototype.asteroid = null;
//AsteroidCollision.prototype.position = null;
//AsteroidCollision.prototype.types = {
//    asteroid: MAsteroid.Asteroid,
//    position: MPosition.Position
//}