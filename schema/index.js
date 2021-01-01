const bookSchema = require("./book");
const bookChapterSchema = require("./bookChapter");
const confPaperSchema = require("./confPaper");
const jnlArticleSchema = require("./jnlArticle");
const webpageSchema = require("./webpage");
const websiteSchema = require("./website");
const verifyFunct = require("./verify");

module.exports = {
    schemas: { 
        book: bookSchema,
        bookChapter: bookChapterSchema,
        confPaper: confPaperSchema,
        jnlArticle: jnlArticleSchema,
        webpage: webpageSchema,
        website: websiteSchema
    },
    verifyFunct
}