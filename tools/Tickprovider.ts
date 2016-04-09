
import MIWindow = require("tools/IWindow");
declare var window: MIWindow.IWindow;

import MSignal = require("tools/Signal");

// Module
export class TickProvider {

        previousTime = 0;
        ticked = new MSignal.Signal();
        request = null;

        constructor() {
        }

        start() {
            this.previousTime = Date.now();
            this.request = window.requestAnimationFrame(this.tick.bind(this));
        }

        stop() {
            window.cancelAnimationFrame(this.request);
        }

        add(listener: Function, context: any) {
            this.ticked.add(listener, context);
        }

        remove(listener: Function, context: any) {
            this.ticked.remove(listener, context);
        }

        tick(timestamp: number = Date.now()) {
            var tmp = this.previousTime;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            requestAnimationFrame(this.tick.bind(this));
        }

}
