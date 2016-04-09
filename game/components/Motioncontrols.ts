import MPoint = require("tools/Point");
import Components = require("core/Components");

export class MotionControls implements  Components.ash.core.IComponents {
    constructor(public left: number, public right: number, public accelerate: number, public accelerationRate: number, public rotationRate: number) {
    }
}