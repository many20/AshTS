///<reference path="Scripts/typings/tsd.d.ts"/>

///<reference path="Scripts/typings/modules.d.ts"/>

import MIWindow = require("tools/IWindow");
declare var window: MIWindow.IWindow;


import $ = require("Scripts/libs/jquery");
import dat = require("Scripts/libs/dat.gui");

import domReady = require('Scripts/libs/domReady');

import MAsteroids = require("game/Asteroids");

window.DEBUG = false;

export module App {

    export var MyGame;
    export var MyDat = dat;
    export var AppStarted = false;

    var CANVAS_WIDTH = 800;
    var CANVAS_HEIGHT = 600;

    export var Start = function () {
        if (!AppStarted) {
            console.log("app started");

            var canvasElem = createCanvas();
            document.getElementById("content").appendChild(canvasElem);

            var asteroids = new MAsteroids.Asteroids();
            asteroids.initialise(canvasElem);
            asteroids.start();

            //window.mg = window.CurrentApp.App.MyGame;
            AppStarted = true;
        } else {
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

    export var InitDebugUI = function (dat) {

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

    }

    //require(['Scripts/libs/domReady!'], function (doc) {
    domReady(() => {
        console.log("document ready");

        //#region "DAT GUI TESTS"
        //console.log(dat);
        if (window.DEBUG) {
            InitDebugUI(dat);
        }

        //#endregion "My Region"

        //var button = document.createElement('button');
        //button.innerHTML = "Start App";
        //button.onclick = function () {
        //    console.log("press");

        //    Start();
        //};
        //$("body").append(button);

        Start();
    });



}
//window.CurrentApp.App = App;

class InstanceLoader {
    constructor(private context: Object) {

    }

    getInstance(name: string, ...args: any[]) {
        var instance = Object.create(this.context[name].prototype);
        instance.constructor.apply(instance, args);
        return instance;
    }
}



