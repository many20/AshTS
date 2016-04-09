import View = require("core/IView");
import Components = require("core/Components");

export class Display implements  Components.ash.core.IComponents {
    constructor(public graphic: View.ash.core.IView) {
    }
}