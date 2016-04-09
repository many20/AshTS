define(["require", "exports"], function (require, exports) {
    "use strict";
    var ash;
    (function (ash) {
        var tools;
        (function (tools) {
            //TODO: replace with Map
            var Dictionary = (function () {
                function Dictionary() {
                    this._keys = [];
                    this._values = [];
                }
                Dictionary.prototype.add = function (key, value) {
                    var keyIndex = this.getIndex(key);
                    if (keyIndex >= 0) {
                        this._values[keyIndex] = value;
                    }
                    else {
                        this._keys.push(key);
                        this._values.push(value);
                    }
                };
                Dictionary.prototype.remove = function (key) {
                    var keyIndex = this.getIndex(key);
                    if (keyIndex >= 0) {
                        var removedValue = this._values[keyIndex];
                        this._keys.splice(keyIndex, 1);
                        this._values.splice(keyIndex, 1);
                        return removedValue;
                    }
                    else {
                        throw "Key does not exist";
                    }
                };
                Dictionary.prototype.getValue = function (key) {
                    var value = null;
                    var keyIndex = this.getIndex(key);
                    if (keyIndex >= 0) {
                        value = this._values[keyIndex];
                    }
                    return value;
                };
                Dictionary.prototype.getIndex = function (testKey) {
                    var i = 0, len = this._keys.length, key;
                    for (; i < len; ++i) {
                        key = this._keys[i];
                        if (key == testKey) {
                            return i;
                        }
                    }
                    return -1;
                };
                Dictionary.prototype.has = function (testKey) {
                    var i = 0, len = this._keys.length, key;
                    for (i; i < len; ++i) {
                        key = this._keys[i];
                        if (key == testKey) {
                            return true;
                        }
                    }
                    return false;
                };
                Dictionary.prototype.values = function () {
                    var i = 0, len = this._keys.length, 
                    //key,
                    value;
                    var arValue = [];
                    for (; i < len; ++i) {
                        //key = this._keys[i];
                        value = this._values[i];
                        arValue.push(value);
                    }
                    return arValue;
                };
                Dictionary.prototype.forEach = function (action) {
                    var i = 0, len = this._keys.length, key, value;
                    for (; i < len; ++i) {
                        key = this._keys[i];
                        value = this._values[i];
                        var breakHere = action(key, value);
                        if (breakHere == "return") {
                            return false;
                        }
                    }
                    return true;
                };
                return Dictionary;
            }());
            tools.Dictionary = Dictionary;
        })(tools = ash.tools || (ash.tools = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
