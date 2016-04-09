import MPoint = require("tools/Point");
import Components = require("core/Components");

export class Motion implements Components.ash.core.IComponents {

    public velocity: MPoint.Point = null;

    constructor(velocityX, velocityY, public angularVelocity, public damping) {
        this.velocity = new MPoint.Point(velocityX, velocityY);
    }
}