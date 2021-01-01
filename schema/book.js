const t = require("./types")

const schema = {
    isSchema: true,
    id: {
        type: t.String,
        required: true
    },
    type: {
        type: t.String,                                 // the type of this field.
        required: true,                                 // set if required field.
        fVerifyVal: (val) => val === "book"             // function to check if val is valid, executed after 'required' & 'type' checks.
    },
    title: {
        type: t.String,
        required: true
    },
    translatedTitle: {
        type: t.String,
        required: false
    },
    originalLanguage: {
        type: t.String,
        required: false
    },
    translators: {
        type: t.ArrayOfStrings,
        required: false
    },
    yearTranslated: {
        type: t.Integer,
        required: false
    },
    authors: {
        type: t.ArrayOfStrings,
        required: false
    },
    corporateAuthor: {
        type: t.String,
        required: false
    },
    editors: {
        type: t.ArrayOfStrings,
        required: false
    },
    volume: {
        type: t.Integer,
        required: true
    },
    edition: {
        type: t.Integer,
        required: true
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
    titleOfSeries: {
        type: t.String,
        required: false
    },
    numberInSeries: {
        type: t.String,
        required: false
    },
    urlOnlineAccess: {
        type: t.String,
        required: false
    },
    dateOnlineAccess: {
        type: t.String,
        required: false
    }
}

module.exports = schema;