import Zip = require("./ZipCodeValidator2");

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validator = new Zip();

// Show whether each string passed each validator
strings.forEach(s => {
  console.log(`"${ s }" - ${ validator.isAcceptable(s) ? "matches" : "does not match" }`);
});