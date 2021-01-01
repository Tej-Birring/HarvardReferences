/**
 * Add ordinal string to a number. E.g.
 *  1 => 1st,
 *  2 => 2nd,
 *  3 => 3rd,
 *  4 => 4th,
 *  etc...
 * 
 * @param {string | number} input The number to postfix ordinal string to.
 * @param {boolean} htmlMode If true, applies <sup> tag to the postfixed ordinal string.
 */
const add_ordinal_suffix = (input, htmlMode = false) => {
    if (typeof input === "string")
        input = parseInt(input);

    var j = input % 10,
        k = input % 100;

    if (j === 1 && k !== 11) {
        if (!htmlMode)
            return input + "st";
        else
            return input + "<sup>st</sup>";
    }

    if (j === 2 && k !== 12) {
        if (!htmlMode)
            return input + "nd";
        else
            return input + "<sup>nd</sup>";
    }

    if (j === 3 && k !== 13) {
        if (!htmlMode)
            return input + "rd";
        else
            return input + "<sup>rd</sup>";
    }

    if (!htmlMode)
        return input + "th";
    else
        return input + "<sup>th</sup>";
};




module.exports = {
    add_ordinal_suffix
};