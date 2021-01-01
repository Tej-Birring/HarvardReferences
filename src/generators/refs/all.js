const schema = require("../../../schema/index")
const Contributors = require("../../parsers/contributors/index")
const ck = require("check-types");
const utils = require("../../utils/index");

const reverseAbbreviatedString = (arrayOfNames) => {
    return (new Contributors(...arrayOfNames)).reverseAbbreviatedString;
};

const forwardAbbreviatedString = (arrayOfNames) => {
    return (new Contributors(...arrayOfNames)).forwardAbbreviatedString;
};

const getPlural = (singular, plural, array) => {
    if (array.length <= 0) return ""
    else if (array.length === 1) return singular
    else return plural;
};

const monthsOfYear = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const getDateString = (dateString) => {
    const [year, month, date] = dateString.split('-');
    return `${utils.add_ordinal_suffix(date)} ${monthsOfYear[month-1]} ${year}`;
}

const getDateRangeString = (dateStringBegin, dateStringEnd) => {
    const [year, monthB, dateB] = dateStringBegin.split('-');
    const [, monthE, dateE] = dateStringEnd.split('-');

    if ((monthB === monthE) && (dateB === dateE)) { // same day
        return `${utils.add_ordinal_suffix(dateB)} ${monthsOfYear[monthB-1]} ${year}`
    }
    else if ((monthB === monthE) && (dateB !== dateE)) {
        return `${utils.add_ordinal_suffix(dateB)} to ${utils.add_ordinal_suffix(dateE)} ${monthsOfYear[monthB-1]}, ${year}`
    }
    else { //if ((monthB !== monthE) && (dateB === dateE)) OR ((monthB !== monthE) && (dateB !== dateE)) {
        return `${utils.add_ordinal_suffix(dateB)} ${monthsOfYear[monthB-1]} to ${utils.add_ordinal_suffix(dateE)} ${monthsOfYear[monthE-1]}, ${year}`
    }
};

const getPgRangeString = (pageRangeString) => {
    const tmp = pageRangeString.trim().split("-");
    if (tmp.length === 1)
        return `pg. ${tmp[0].trim()}`;
    else if (tmp.length === 2)
        return `pp. ${tmp[0].trim()}-${tmp[1].trim()}`
    else 
        console.error("Unrecognized page range string!", pageRangeString);
}




/**
 * 
 * Produce a reference string for a book.
 * 
 * @param {Object} obj 
 */
module.exports.book = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.book);
    
    if (error) {
        console.error("Not a valid or acceptable 'book' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = obj.authors ? `${reverseAbbreviatedString(obj.authors)}` : obj.corporateAuthor ? `${obj.corporateAuthor}` : "";

    // editors string
    let editorsString = obj.editors ? `${reverseAbbreviatedString(obj.editors)} ${getPlural('ed.', 'eds.', obj.editors)}` : "";

    // title string
    let titleString = `${obj.title}.`;
    if (obj.translatedTitle)
        titleString += ` [${obj.translatedTitle}].`;

    let seriesString = (obj.titleOfSeries && obj.numberInSeries) ? `${obj.titleOfSeries}. Number ${obj.numberInSeries}.` : "";

    // online strings
    let onlineTag = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? "[Online]." : "";
    let onlineString = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].` : "";

    // volume and edition strings
    let volString = (obj.volume > 1) ? `Vol. ${obj.volume}.` : "";
    let ednString = (obj.edition > 1) ? `${utils.add_ordinal_suffix( obj.edition , true )} edn.` : "";

    // publisher string
    let publisherString = `${obj.locationOfPublisher}: ${obj.nameOfPublisher}.`

    // translated string
    let translatedString = "";
    if (obj.originalLanguage && obj.translators && obj.yearTranslated)
        translatedString = `Translated from ${obj.originalLanguage} by ${forwardAbbreviatedString(obj.translators)} (${obj.yearTranslated}).`;
    else if (obj.originalLanguage && obj.translators && !obj.yearTranslated)
        translatedString = `Translated from ${obj.originalLanguage} by ${forwardAbbreviatedString(obj.translators)}.`;

    // generate...
    let OUT = "";
    if (obj.authors || obj.corporateAuthor) { // attribute to authors
        OUT = `${authorsString} (${obj.yearPublished}). ${utils.em(titleString)} ${translatedString} ${onlineTag} ${seriesString} ${volString} ${ednString} ${publisherString} ${onlineString}`;
    }
    else if (!obj.authors && !obj.corporateAuthor && obj.editors) { // attribute to editors
        OUT = `${editorsString} (${obj.yearPublished}). ${utils.em(titleString)} ${translatedString} ${onlineTag} ${seriesString} ${volString} ${ednString} ${publisherString} ${onlineString}`;
    }
    else { // use title for attribution
        // make sure title string has no full stops
        titleString = titleString.replace('.', '');
        OUT = `${utils.em(titleString)} (${obj.yearPublished}). ${translatedString} ${onlineTag} ${seriesString} ${volString} ${ednString} ${publisherString} ${onlineString}`;
    }
    return utils.sanitise_whitespace(OUT);
};




/**
 * 
 * Produce a reference string for a book chapter.
 * 
 * @param {Object} obj 
 */
module.exports.bookChapter = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.bookChapter);
    
    if (error) {
        console.error("Not a valid or acceptable 'book chapter' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = `${reverseAbbreviatedString(obj.authors)}`;

    // editors string
    let editorsString = `${reverseAbbreviatedString(obj.editors)} ${getPlural('ed.', 'eds.', obj.editors)}`;

    // title string
    let titleString = `${obj.title}.`;
    if (obj.translatedTitle)
        titleString += ` [${obj.translatedTitle}].`;

    let seriesString = (obj.titleOfSeries && obj.numberInSeries) ? `${obj.titleOfSeries}. Number ${obj.numberInSeries}.` : "";

    // online strings
    let onlineTag = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? "[Online]." : "";
    let onlineString = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].` : "";

    // volume and edition strings
    let volString = (obj.volume > 1) ? `Vol. ${obj.volume}.` : "";
    let ednString = (obj.edition > 1) ? `${utils.add_ordinal_suffix( obj.edition , true )} edn.` : "";

    // page range and publisher string
    let publisherString = `${obj.locationOfPublisher}: ${obj.nameOfPublisher}`;
    if (obj.pageRange)
        publisherString += `, ${getPgRangeString(obj.pageRange)}.`;
    else publisherString += `.`;
     
    // translated string
    let translatedString = "";
    if (obj.originalLanguage && obj.translators && obj.yearTranslated)
        translatedString = `Translated from ${obj.originalLanguage} by ${forwardAbbreviatedString(obj.translators)} (${obj.yearTranslated}).`;
    else if (obj.originalLanguage && obj.translators && !obj.yearTranslated)
        translatedString = `Translated from ${obj.originalLanguage} by ${forwardAbbreviatedString(obj.translators)}.`;

    // title of book string
    let titleOfBookString = `${obj.titleOfBook}.`;

    // generate...
    let OUT = `${authorsString} (${obj.yearPublished}). ${titleString} In: ${editorsString} ${utils.em(titleOfBookString)} ${translatedString} ${onlineTag} ${seriesString} ${volString} ${ednString} ${publisherString} ${onlineString}`;
    return utils.sanitise_whitespace(OUT);
};




/**
 * 
 * Produce a reference string for a conference paper.
 * 
 * @param {Object} obj 
 */
module.exports.confPaper = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.confPaper);
    
    if (error) {
        console.error("Not a valid or acceptable 'conference paper' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = obj.authors ? `${reverseAbbreviatedString(obj.authors)}` : obj.corporateAuthor ? `${obj.corporateAuthor}` : "";

    // editors string
    let editorsString = obj.editors ? `${reverseAbbreviatedString(obj.editors)} ${getPlural('ed.', 'eds.', obj.editors)}` : "";

    // title string
    let titleString = `${obj.title}.`;

    // online strings
    let onlineTag = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? "[Online]." : "";
    let onlineString = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].` : "";

    // page range and publisher string
    let publisherString = `${obj.locationOfPublisher}: ${obj.nameOfPublisher}`;
    if (obj.pageRange) 
        publisherString += `, ${getPgRangeString(obj.pageRange)}.`;
    else publisherString += `.`;

    // conference details string
    let conferenceString = `${obj.nameOfConference}, ${getDateRangeString(obj.dateConferenceBegin, obj.dateConferenceEnd)}.`
    let conferenceLocationString = `${obj.locationOfConference}.`
    // generate...
    let OUT = `${authorsString} (${obj.yearPublished}). ${titleString} ${onlineTag} In: ${editorsString} ${utils.em(conferenceString)} ${conferenceLocationString} ${publisherString} ${onlineString}`;
    return utils.sanitise_whitespace(OUT);
};




/**
 * 
 * Produce a reference string for a journal article.
 * 
 * @param {Object} obj 
 */
module.exports.jnlArticle = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.jnlArticle);
    
    if (error) {
        console.error("Not a valid or acceptable 'journal article' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = obj.authors ? `${reverseAbbreviatedString(obj.authors)}` : obj.corporateAuthor ? `${obj.corporateAuthor}` : "";

    // title string
    let titleString = `${obj.title}.`;

    // online strings
    let onlineTag = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? "[Online]," : "";
    let onlineString = (obj.urlOnlineAccess && obj.dateOnlineAccess) ? `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].` : "";

    // journal details string
    let journalTitleString = 
        onlineTag ? 
            `${utils.em(obj.titleOfJournal)} ${onlineTag}` :
            `${utils.em(obj.titleOfJournal)},`;
    let journalInfoString = `${obj.volume}(${obj.issue}), ${getPgRangeString(obj.pageRange)}.`

    // generate...
    let OUT = `${authorsString} (${obj.yearPublished}). ${titleString} ${journalTitleString} ${journalInfoString} ${onlineString}`;
    return utils.sanitise_whitespace(OUT);
};




/**
 * 
 * Produce a reference string for a webpage.
 * 
 * @param {Object} obj 
 */
module.exports.webpage = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.webpage);
    
    if (error) {
        console.error("Not a valid or acceptable 'webpage' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = obj.authors ? `${reverseAbbreviatedString(obj.authors)}` : obj.corporateAuthor ? `${obj.corporateAuthor}` : "";

    let yearString = obj.yearPublished ? obj.yearPublished : "n.d.";
    
    // title strings
    let pageTitleString = `${utils.em(obj.title)} [Online].`;
    let siteTitleString = `${obj.titleOfWebsite}.`;
    
    // online string
    let onlineString = `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].`;

    // generate...
    let OUT = "";
    if (obj.authors || obj.corporateAuthor)
        OUT = `${authorsString} (${yearString}). ${pageTitleString} ${siteTitleString} ${onlineString}`;
    else 
        OUT = `${obj.titleOfWebsite} (${yearString}). ${pageTitleString} ${onlineString}`;
    return utils.sanitise_whitespace(OUT);
};




/**
 * 
 * Produce a reference string for a website.
 * 
 * @param {Object} obj 
 */
module.exports.website = (obj) => {
    const error = schema.verifyFunct(obj, schema.schemas.website);
    
    if (error) {
        console.error("Not a valid or acceptable 'website' entry! Could not generate string.");
        return;
    }

    // authors string : human authors > corporate author > empty
    let authorsString = obj.authors ? `${reverseAbbreviatedString(obj.authors)}` : obj.corporateAuthor ? `${obj.corporateAuthor}` : "";

    let yearString = obj.yearPublished ? obj.yearPublished : "n.d.";
    
    // title strings
    let siteTitleString = `${obj.title}.`;
    
    // online string
    let onlineString = `Available from: ${utils.link(obj.urlOnlineAccess)} [Accessed ${getDateString(obj.dateOnlineAccess)}].`;

    // generate...
    let OUT = "";
    if (obj.authors || obj.corporateAuthor)
        OUT = `${authorsString} (${yearString}). ${siteTitleString} ${onlineString}`;
    else 
        OUT = `${obj.title} (${yearString}). ${onlineString}`;
    return utils.sanitise_whitespace(OUT);
};