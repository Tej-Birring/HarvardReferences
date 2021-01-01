/**
 * 
 * Capitalizes the very first letter of the input string.
 * 
 * @param {string} input 
 */
const capitalise_first_letter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1)
};




/**
 * 
 * Capitalizes *every* letter of the input string.
 * 
 * @param {string} input 
 */
const capitalise_first_letters = (input) => {
    // console.log("capitalizing: ", input);
    const tmp = input.split(" ");
    // console.log("transormed: ", `${input} => ${tmp.toString()}`);

    tmp.forEach((word, idx, arr) => {
        arr[idx] = word[0].toUpperCase() + word.slice(1);
    })

    return tmp.join(" ");
};




module.exports = {
    capitalise_first_letter,
    capitalise_first_letters
};