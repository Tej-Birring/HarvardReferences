const Contributor = require("./contributor");




class Contributors {
    /**
     * A class to represent multiple authors/editors/translators/contributors.
     * 
     * @param  {Array<string>} fullNames Array of full names of contributors.
     */
    constructor(...fullNames) {
        // parse
        let contributors = [];
        fullNames.forEach( fullName => {
            contributors.push( Contributor.fromFullName(fullName) );
        });
        // set
        this.contributors = contributors;
        this.length = contributors.length;
        this.reverseAbbreviatedString = contributors.map(c => c.getReverseAbbreviatedName()).join(", ");
        this.forwardAbbreviatedString = contributors.map(c => c.getForwardAbbreviatedName()).join(", ");
        this.fullNamesString = contributors.map(c => c.getFullName()).join(", ");
    }

    static fromFullNames(...fullNames) { return new Contributors(...fullNames); }
}




module.exports = Contributors;