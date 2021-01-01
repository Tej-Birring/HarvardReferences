const { string } = require("check-types");
const capitalisation = require("./capitalisation")
const html = require("./html")
const numbers = require("./numbers")
const strings = require("./strings")
// import stringSanitization from "./stringSanitization.js"




module.exports = {
    ...capitalisation,
    ...html,
    ...numbers,
    ...strings,
    alphabet_only_no_spaces: (val) => val,
    single_spaced_alphabet_only: (val) => val,
    // ...stringSanitization
};