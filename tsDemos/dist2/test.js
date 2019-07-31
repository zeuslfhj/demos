define(["require", "exports", "./ZipCodeValidator2"], function (require, exports, Zip) {
    "use strict";
    exports.__esModule = true;
    // Some samples to try
    var strings = ["Hello", "98052", "101"];
    // Validators to use
    var validator = new Zip();
    // Show whether each string passed each validator
    strings.forEach(function (s) {
        console.log("\"" + s + "\" - " + (validator.isAcceptable(s) ? "matches" : "does not match"));
    });
});