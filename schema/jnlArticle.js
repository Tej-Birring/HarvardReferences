const t = require("./types")

const schema = {
    isSchema: true,
    id: {
        type: t.String,
        required: true
    },
    type: {
        type: t.String,                                     // the type of this field.
        required: true,                                     // set if required field.
        fVerifyVal: (val) => val === "jnlArticle"            // function to check if val is valid, executed after 'required' & 'type' checks.
    },
    title: {
        type: t.String,
        required: true
    },
    authors: {
        type: t.ArrayOfStrings,
        required: true
    },
    volume: {
        type: t.Integer,
        required: true
    },
    issue: {
        type: t.Integer,
        required: true
    },
    yearPublished: {
        type: t.Integer,
        required: true
    },
    urlOnlineAccess: {
        type: t.String,
        required: false
    },
    dateOnlineAccess: {
        type: t.String,
        required: false
    },
    pageRange: {
        type: t.String,
        required: true
    },
    titleOfJournal: {
        type: t.String,
        required: true
    },
}

module.exports = schema;