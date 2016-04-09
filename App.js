///<reference path="Scripts/typings/tsd.d.ts"/>
define(["require", "exports", "Scripts/libs/dat.gui", 'Scripts/libs/domReady', "game/Asteroids"], function (require, exports, dat, domReady, MAsteroids) {
    "use strict";
    window.DEBUG = false;
    var App;
    (function (App) {
        App.MyDat = dat;
        App.AppStarted = false;
        var CANVAS_WIDTH = 800;
        var CANVAS_HEIGHT = 600;
        App.Start = function () {
            if (!App.AppStarted) {
                console.log("app started");
                var canvasElem = createCanvas();
                document.getElementById("content").appendChild(canvasElem);
                var asteroids = new MAsteroids.Asteroids();
                asteroids.initialise(canvasElem);
                asteroids.start();
                //window.mg = window.CurrentApp.App.MyGame;
                App.AppStarted = true;
            }
            else {
                console.log("App is singleton and is already started!");
            }
        };
        function createCanvas() {
            var canvasElem = document.createElement("canvas");
            canvasElem.setAttribute("id", "game_stage");
            canvasElem.setAttribute("width", CANVAS_WIDTH.toString());
            canvasElem.setAttribute("height", CANVAS_HEIGHT.toString());
            canvasElem.style.backgroundColor = "#000";
            return canvasElem;
        }
        App.InitDebugUI = function (dat) {
            var FizzyText = function () {
                this.message = 'dat.gui';
                this.speed = 0.8;
                this.displayOutline = false;
                this.explode = function () {
                    //console.log(App.MyGame);
                };
                // Define render logic ...
            };
            var text = new FizzyText();
            var gui = new dat.GUI();
            gui.add(text, 'message');
            gui.add(text, 'speed', -5, 5);
            gui.add(text, 'displayOutline');
            gui.add(text, 'explode');
        };
        //require(['Scripts/libs/domReady!'], function (doc) {
        domReady(function () {
            console.log("document ready");
            //#region "DAT GUI TESTS"
            //console.log(dat);
            if (window.DEBUG) {
                App.InitDebugUI(dat);
            }
            //#endregion "My Region"
            //var button = document.createElement('button');
            //button.innerHTML = "Start App";
            //button.onclick = function () {
            //    console.log("press");
            //    Start();
            //};
            //$("body").append(button);
            App.Start();
        });
    })(App = exports.App || (exports.App = {}));
    //window.CurrentApp.App = App;
    var InstanceLoader = (function () {
        function InstanceLoader(context) {
            this.context = context;
        }
        InstanceLoader.prototype.getInstance = function (name) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var instance = Object.create(this.context[name].prototype);
            instance.constructor.apply(instance, args);
            return instance;
        };
        return InstanceLoader;
    }());
});
