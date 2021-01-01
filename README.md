## About
Use this package to generate Harvard-style references for academic sources. Currently supported types include:

* Book
* Chapter in Edited Book
* Conference Paper
* Journal Article
* Webpage
* Website

## Pending Work
This library is new, and therefore still undergoing crucial development.
### Development Roadmap:
The following features are planned for implementation:
1. Generate citation strings.
2. Support additional types of academic sources:
  * Manuscript
  * Online video
  * Report
  * Newspaper/magazine article
  * Personal correspondence
  * Entire conference proceeding
  * Unpublished conference papers/poster

## Use
### Installing the Package
Use Node package manager (npm) to install the package into your Node application:
```
$ npm install -s harvard_references 
```
### Importing in your Project's Source File(s)
In your source code, import the "namespace" via:
```
const hvref = require("harvard_references");
```
Alternatively, using ES6 syntax:
```
import hvref from "harvard_references"
```
### Generating References
```
const myBook = {
    // object must contain all mandatory fields for 'book' reference...
    // see table below
};

const ref = hvref.generateReference(myBook);
console.log(ref);
```
---

## Specifications for **Book** object:
Note: All fields in a group must be specified and valid for the relevant information to be made available in the 
generated string.

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***book***
| title                 | Yes       | String                |             | Title of the book.
| volume                | Yes       | Integer               |             | Volume #, must be 1 if unspecified by source.
| edition               | Yes       | Integer               |             | Edition #, must be 1 if unspecified by source.
| nameOfPublisher       | Yes       | String                |             | Name of the book publisher.
| locationOfPublisher   | Yes       | String                |             | Location (usually the city) of the book publisher.
| yearPublished         | Yes       | Integer               |             | The year the book was published.
| translatedTitle       | Optional  | String                |             | Original title of the book - if translated.
| originalLanguage      | Optional  | String                | Translated  | Original language of the book - if translated.
| translators           | Optional  | Array\<String\>       | Translated  | Translator(s) of the book.
| yearTranslated        | Optional  | Integer               |             | The year the translation was published.
| authors               | Optional  | Array\<String\>       |             | Author(s) of the book. 
| corporateAuthor       | Optional  | String                |             | The corporate author associated with the book. Note: If "real" authors are specified in 'authors' field, this will not be used.
| editors               | Optional  | Array\<String\>       |             | Editors(s) of the book.
| titleOfSeries         | Optional  | String                | Series      | Title of the series the book belongs to.
| numberInSeries        | Optional  | Integer               | Series      | Number of the book, in the series that the book belongs to.
| urlOnlineAccess       | Optional  | String                | Online      | URL to access this book online.
| dateOnlineAccess      | Optional  | String                | Online      | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
---

## Specifications for **Book Chapter** object:
Note: All fields in a group must be specified and valid for the relevant information to be made available in the 
generated string.

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***bookChapter***
| title                 | Yes       | String                |             | Title of the chapter.
| titleOfBook           | Yes       | String                |             | Title of the book.
| volume                | Yes       | Integer               |             | Volume #, must be 1 if unspecified by source.
| edition               | Yes       | Integer               |             | Edition #, must be 1 if unspecified by source.
| nameOfPublisher       | Yes       | String                |             | Name of the book publisher.
| locationOfPublisher   | Yes       | String                |             | Location (usually the city) of the book publisher.
| yearPublished         | Yes       | Integer               |             | The year the book was published.
| authors               | Yes       | Array\<String\>       |             | Author(s) of the chapter.
| editors               | Yes       | Array\<String\>       |             | Editors(s) of the book.
| translatedTitle       | Optional  | String                |             | Original title of the book - if translated.
| originalLanguage      | Optional  | String                | Translated  | Original language of the book - if translated.
| translators           | Optional  | Array\<String\>       | Translated  | Translator(s) of the book.
| yearTranslated        | Optional  | Integer               |             | The year the translation was published.
| titleOfSeries         | Optional  | String                | Series      | Title of the series the book belongs to.
| numberInSeries        | Optional  | Integer               | Series      | Number of the book, in the series that the book belongs to.
| urlOnlineAccess       | Optional  | String                | Online      | URL to access the chapter online.
| dateOnlineAccess      | Optional  | String                | Online      | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
| pageRange             | Optional  | String                |             | E.g. "59", or "100-112". Represents the pages within which to find this chapter in the book.
---

## Specifications for **Conference Paper** object:
Note: All fields in a group must be specified and valid for the relevant information to be made available in the 
generated string.

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***confPaper***
| title                 | Yes       | String                |             | Title of the conference paper.
| authors               | Yes       | Array\<String\>       |             | Author(s) of the conference paper.
| editors               | Yes       | Array\<String\>       |             | Editors(s) of the conference proceedings.
| nameOfPublisher       | Yes       | String                |             | Name of the publisher of the proceedings — often a university.
| locationOfPublisher   | Yes       | String                |             | Location (usually the city) of the publisher.
| nameOfConference      | Yes       | String                |             | Name of the conference.
| locationOfConference  | Yes       | String                |             | Location where the conference was held.
| dateConferenceBegin   | Yes       | String                |             | Date (represented by string "YYYY-MM-DD") of the first day.
| dateConferenceEnd     | Yes       | String                |             | Date (represented by string "YYYY-MM-DD") of the last day. Must be same as 'dateConferenceBegin' for one-day conferences.
| yearPublished         | Yes       | Integer               |             | The year the proceedings were published.
| urlOnlineAccess       | Optional  | String                | Online      | URL to access the paper online.
| dateOnlineAccess      | Optional  | String                | Online      | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
| pageRange             | Optional  | String                |             | E.g. "59", or "100-112". Represents the pages within which to find this paper in the proceedings.
---

## Specifications for **Journal Article** object:
Note: All fields in a group must be specified and valid for the relevant information to be made available in the 
generated string.

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***jnlArticle***
| title                 | Yes       | String                |             | Title of the journal article.
| titleOfJournal        | Yes       | String                |             | Title of the journal that the article belongs to.
| authors               | Yes       | Array\<String\>       |             | Author(s) of the journal article. 
| volume                | Yes       | Integer               |             | Volume # of the journal within which the article was published.
| issue                 | Yes       | Integer               |             | Issue # of the journal within which the article was published.
| yearPublished         | Yes       | Integer               |             | The year the journal was published.
| pageRange             | Yes       | String                |             | E.g. "59", or "100-112". Represents the pages within which to find this paper in the journal.
| urlOnlineAccess       | Optional  | String                | Online      | URL to access this journal article online.
| dateOnlineAccess      | Optional  | String                | Online      | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
---

## Specifications for **Webpage** object:

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***webpage***
| title                 | Yes       | String                |             | Title of the webpage.
| titleOfWebsite        | Yes       | String                |             | Title of the website that the page belongs to.
| authors               | Yes       | Array\<String\>       |             | Author(s) of the webpage. 
| corporateAuthor       | Optional  | String                |             | The corporate author associated with the webpage. Note: If "real" authors are specified in 'authors' field, this will not be used.
| yearPublished         | False     | Integer               |             | The year the webpage was published.
| urlOnlineAccess       | Yes       | String                |             | The URL.
| dateOnlineAccess      | Yes       | String                |             | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
---

## Specifications for **Website** object:

|                       | Required  | Type                  | Group       | Description
|-----------------------|-----------|-----------------------|-------------|-------------
| id                    | Yes       | String                |             | Unique ID to identify the object.
| type                  | Yes       | String                |             | Used to identify the *type* of academic source represented by this object. Must be value: ***website***
| title                 | Yes       | String                |             | Title of the website.
| authors               | Yes       | Array\<String\>       |             | Author(s) of the website. 
| corporateAuthor       | Optional  | String                |             | The corporate author associated with the website. Note: If "real" authors are specified in 'authors' field, this will not be used.
| yearPublished         | False     | Integer               |             | The year the website was published.
| urlOnlineAccess       | Yes       | String                |             | The URL.
| dateOnlineAccess      | Yes       | String                |             | Date (represented by string "YYYY-MM-DD") that the URL was last accessed.
---

