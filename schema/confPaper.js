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
        fVerifyVal: (val) => val === "confPaper"            // function to check if val is valid, executed after 'required' & 'type' checks.
    },
    title: {
        type: t.String,
        required: true
    },
    authors: {
        type: t.ArrayOfStrings,
        required: true
    },
    editors: {
        type: t.ArrayOfStrings,
        required: false
    },
    nameOfPublisher: {
        type: t.String,
        required: true
    },
    locationOfPublisher: {
        type: t.String,
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
        required: false
    },
    nameOfConference: {
        type: t.String,
        required: true
    },
    locationOfConference: {
        type: t.String,
        required: true
    },
    dateConferenceBegin: {
        type: t.String,
        required: true
    },
    dateConferenceEnd: {
        type: t.String,
        required: true
    }
}

module.exports = schema;