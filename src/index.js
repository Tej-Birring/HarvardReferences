const ck = require("check-types");
const refs = require("./generators/refs/all");


const isInvalidInput = (obj) => ( !ck.nonEmptyObject(obj) || !obj.type | !ck.string(obj.type) );


module.exports.generateReference = (obj) => {
    if (isInvalidInput(obj)) {
        console.error("Unrecognized input: ", obj);
        return;
    }

    switch (obj.type) {
        case "book": 
        return refs.book(obj);
        break;
        case "bookChapter": 
        return refs.bookChapter(obj);
        break;
        case "confPaper": 
        return refs.confPaper(obj);
        break;
        case "jnlArticle": 
        return refs.jnlArticle(obj);
        break;
        case "webpage": 
        return refs.webpage(obj);
        break;
        case "website": 
        return refs.website(obj);
        break;
        default:
            console.error("Unrecognized or unimplemented type: ", type);
    }
};


// module.exports.generateCitation = (obj) => {
//     if (isInvalidInput(obj)) {
//         console.error("Unrecognized input: ", obj);
//         return;
//     }
// }