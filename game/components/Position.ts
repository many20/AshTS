import MPoint = require("tools/Point");
import Components = require("core/Components");

export class Position implements  Components.ash.core.IComponents {

    public position: MPoint.Point = null;

    constructor(x: number, y: number, public rotation: number, public collisionRadius: number) {
        this.position = new MPoint.Point(x, y);
    }
}