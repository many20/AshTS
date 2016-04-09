import MPoint = require("tools/Point");
import Components = require("core/Components");

export class Gun implements  Components.ash.core.IComponents {

    public shooting: boolean = false;
    public timeSinceLastShot: number = 0;
    public offsetFromParent: MPoint.Point = null;

    constructor(offsetX, offsetY, public minimumShotInterval: number, public bulletLifetime: number) {
        this.offsetFromParent = new MPoint.Point( offsetX, offsetY );
    }
}