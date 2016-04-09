import Components = require("core/Components");

export class Bullet implements Components.ash.core.IComponents {
    constructor(public lifeTime: number) {
    }
}