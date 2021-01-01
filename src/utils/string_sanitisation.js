const XRegExp = require("xregexp")
// https://apps.timwhitlock.info/js/regex#
// https://jrgraphix.net/r/Unicode/0E00-0E7F




const allLatinAlphabetChars = XRegExp("([A-Za-zªµºÀ-ÖØ-öø-ƺƼ-ƿǄǆ-Ǉǉ-Ǌǌ-Ǳǳ-ʓʕ-ʯͰ-ͳͶ-ͷͻ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԣԱ-Ֆա-ևႠ-Ⴥᴀ-ᴫᵢ-ᵷᵹ-ᶚḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾇᾐ-ᾗᾠ-ᾧᾰ-ᾴᾶ-Άιῂ-ῄῆ-Ήῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-Ώⁱⁿℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℴℹℼ-ℿⅅ-ⅉⅎↃ-ↄⰀ-Ⱞⰰ-ⱞⱠ-Ɐⱱ-ⱼⲀ-ⳤⴀ-ⴥꙀ-ꙟꙢ-ꙭꚀ-ꚗꜢ-ꝯꝱ-ꞇꞋ-ꞌﬀ-ﬆﬓ-ﬗＡ-Ｚａ-ｚ]|\ud801[\udc00-\udc4f]|\ud835[\udc00-\udc54\udc56-\udc9c\udc9e-\udc9f\udca2\udca5-\udca6\udca9-\udcac\udcae-\udcb9\udcbb\udcbd-\udcc3\udcc5-\udd05\udd07-\udd0a\udd0d-\udd14\udd16-\udd1c\udd1e-\udd39\udd3b-\udd3e\udd40-\udd44\udd46\udd4a-\udd50\udd52-\udea5\udea8-\udec0\udec2-\udeda\udedc-\udefa\udefc-\udf14\udf16-\udf34\udf36-\udf4e\udf50-\udf6e\udf70-\udf88\udf8a-\udfa8\udfaa-\udfc2\udfc4-\udfcb])+", "gu");
/**
 * Extract contiguous strings of alphabetical characters as array.
 * 
 * @param {string} input 
 */
const extractWords = (input) => {
    return XRegExp.match(input, allLatinAlphabetChars);
};




/**
* 
* Ensures that all whitespace (including newline/return chars) 
* are replaced with a single " ". 
*
* Removes any character not in within range: [a-zA-Z0-9\_-].
*
* Allows a trailing fullstop, if specified.
* 
* @param {string} input The string to sanitize.
* @param {allowTrailingFullstop} allowTrailingFullstop If true, fullstop at the end of the input string will not be sanitized.
*/
const single_spaced_alphanumeric_allow_underscores_dashes = function (input, allowTrailingFullstop = false) {
    input.replace(/(?:\s+)/g, " ").trim();
    // sanitize all apart from trailing fullstop.
    const hasTrailingFullstop = input[input.length - 1] === ".";
    input = input.replace(/(?:[^a-zA-Z0-9\_\-\ \(\)]+)/g, "");
    if (allowTrailingFullstop && hasTrailingFullstop)
        input = input + ".";
    return input;
}




/**
* 
* Removes all non-alphabet characters,
* including any and all whitespace (including newline/return chars). 
* 
* @param {string} input The string to sanitize.
*/
const alphabet_only_no_spaces = function (input) {
    const selectWords = extractWords(input);
    const joinWords = selectWords.join("");
    return input;
}




/**
 * 
 * Selects all contiguous (unicode latin) alphabetical characters and joins them with a single " ".
 * 
 * @param {input} input The string to sanitize.
 */
const single_spaced_alphabet_only = function (input) {
    const selectWords = extractWords(input);
    const joinWords = selectWords.join(" ");
    return input;
}




const sanitise_whitespace = (str) => {
    return str.replace(/\s+/g, " ");
}




module.exports = {
    single_spaced_alphanumeric_allow_underscores_dashes,
    alphabet_only_no_spaces,
    single_spaced_alphabet_only,
    sanitise_whitespace
};