import Components = require("core/Components");

export class GameState implements  Components.ash.core.IComponents {

    public lives:number = 0;
    public level: number = 0;
    public points: number = 0;

    constructor(public width: number, public height: number) {
    }
}