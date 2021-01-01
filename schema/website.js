const t = require("./types")

const schema = {
    isSchema: true,
    id: {
        type: t.String,
        required: true
    },
    type: {
        type: t.String,                         // the type of this field.
        required: true,                         // set if required field.
        fVerifyVal: (val) => val === "website"  // function to check if val is valid, executed after 'required' & 'type' checks.
    },
    title: {
        type: t.String,
        required: true
    },
    authors: {
        type: t.ArrayOfStrings,
        required: false
    },
    corporateAuthor: {
        type: t.String,
        required: false
    },
    yearPublished: {
        type: t.Integer,
        required: false
    },
    urlOnlineAccess: {
        type: t.String,
        required: true
    },
    dateOnlineAccess: {
        type: t.String,
        required: true
    }
}

module.exports = schema;