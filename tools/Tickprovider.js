define(["require", "exports", "tools/Signal"], function (require, exports, MSignal) {
    "use strict";
    // Module
    var TickProvider = (function () {
        function TickProvider() {
            this.previousTime = 0;
            this.ticked = new MSignal.Signal();
            this.request = null;
        }
        TickProvider.prototype.start = function () {
            this.previousTime = Date.now();
            this.request = window.requestAnimationFrame(this.tick.bind(this));
        };
        TickProvider.prototype.stop = function () {
            window.cancelAnimationFrame(this.request);
        };
        TickProvider.prototype.add = function (listener, context) {
            this.ticked.add(listener, context);
        };
        TickProvider.prototype.remove = function (listener, context) {
            this.ticked.remove(listener, context);
        };
        TickProvider.prototype.tick = function (timestamp) {
            if (timestamp === void 0) { timestamp = Date.now(); }
            var tmp = this.previousTime;
            this.previousTime = timestamp;
            var delta = (timestamp - tmp) * 0.001;
            this.ticked.dispatch(delta);
            requestAnimationFrame(this.tick.bind(this));
        };
        return TickProvider;
    }());
    exports.TickProvider = TickProvider;
});
