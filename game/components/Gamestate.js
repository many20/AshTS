define(["require", "exports"], function (require, exports) {
    "use strict";
    var GameState = (function () {
        function GameState(width, height) {
            this.width = width;
            this.height = height;
            this.lives = 0;
            this.level = 0;
            this.points = 0;
        }
        return GameState;
    }());
    exports.GameState = GameState;
});
