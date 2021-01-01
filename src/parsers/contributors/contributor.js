const utils = require("../../utils/index")




/**
 *
 * Splits the "full name" input string into:
 * [ firstName, middleNames, lastName]
 * 
 * @param {string} fullName 
 */
const splitFullName = (fullName) => {
  // allow alphabet and single " " only.
  fullName = utils.single_spaced_alphabet_only(fullName);
  // ensure first letter of all "words" (first name, middle names, last name) are capitals.
  fullName = utils.capitalise_first_letters(fullName);

  // split full name into indivual names (first, middle?, last):
  const tmp = fullName.split(" ");
  if (tmp.length < 2) {
        // console.error("Expected atleast first name and last name!");
        return [tmp[0], undefined, undefined];
    }

  // extract first name
  let firstName = tmp.shift();

  // extract last name
  let lastName = tmp.pop();

  // extract middle name(s) if present
  let middleNames = undefined;
  if (tmp.length > 0)
    middleNames = tmp.join(" ");

  return [firstName, middleNames, lastName];
}




class Contributor {
  /**
   * 
   * A class to represent a single human author/editor/translator/contributor to a
   * piece of the referenced work.
   * 
   * @param {string} firstName 
   * @param {string?} middleNames 
   * @param {string} lastName 
   * 
   */
  constructor(firstName, middleNames, lastName) {
    this.firstName =
        utils.capitalise_first_letter(
            utils.alphabet_only_no_spaces(firstName)
        );
    // console.log(`FIRST NAME => '${this.firstName}'`)

    if (middleNames && middleNames.length > 0) {
      this.middleNames = middleNames.split(" ");
      this.middleNames.forEach((val, idx, arr) => {
        arr[idx] =
            utils.capitalise_first_letter(
                utils.alphabet_only_no_spaces(val)
          );
      });
      // console.log(`MIDDLE NAME(S) => '${this.middleNames.join(" ")}'`)
    }

    this.lastName =
        utils.capitalise_first_letter(
            utils.alphabet_only_no_spaces(lastName)
        );
    // console.log(`LAST NAME => '${this.lastName}'`)
  }
  /**
   * 
   * Generate a new Contributor object from the full name of an
   * author/editor/translator/contributor.
   * 
   * @param {string} fullName 
   */
  static fromFullName(fullName) {
    const [firstName, middleNames, lastName] = splitFullName(fullName);
    return new Contributor(firstName, middleNames, lastName);
  }
  /**
   * 
   * Get this author's full name as string, in the format:
   * <Firstname> <Middle Names> <Lastname>
   * 
   */
  getFullName() {
    // if already computed, return buffered:
    if (this.fullName) return this.fullName;
    // otherwise compute:
    let fullName = this.firstName;
    fullName += this.middleNames ? ` ${this.middleNames.join(" ")}` : "";
    fullName += ` ${this.lastName}`;
    //
    this.fullName = fullName;
    return fullName;
  }
  /**
   * 
   * Get this author's name in a format suitable for attribution in a Harvard references list, 
   * - that is, with the "last name" at the front.
   *
   * i.e. in the format:
   * <Firstname> <Middle Names> <Lastname> => Lastname F.M.N.
   * 
   */
  getReverseAbbreviatedName() {
    // if already computed, return buffered:
    if (this.reverseAbbreviatedString) return this.reverseAbbreviatedString;
    // otherwise compute:
    // 1. crunch first name and all middle names into format "FIRST.MIDDLE_1.MIDDLE_2.MIDDLE_N."
    const crunch = [];
    crunch.push(`${this.firstName[0]}.`);
    if (this.middleNames) {
      this.middleNames.forEach(middleName => {
        crunch.push(`${middleName[0]}.`);
      });
    }
    //
    const reverseAbbreviatedString = `${this.lastName} ${crunch.join("")}`;
    this.reverseAbbreviatedString = reverseAbbreviatedString;
    return reverseAbbreviatedString;
  }
  /**
   * 
   * Get this author's name in a Harvard-style abbreviated form - with the "last name" at the end,
   * i.e. in the format:
   * <Firstname> <Middle Names> <Lastname> => F.M.N. Lastname
   * 
   */
  getForwardAbbreviatedName() {
    if (this.forwardAbbreviatedName) return this.forwardAbbreviatedName;
    // otherwise compute: 
    // 1. crunch first name and all middle names into format "FIRST.MIDDLE_1.MIDDLE_2."
    const crunch = [];
    crunch.push(`${this.firstName[0]}.`);
    if (this.middleNames) {
      this.middleNames.forEach(middleName => {
        crunch.push(`${middleName[0]}.`);
      });
    }
    //
    const forwardAbbreviatedName = `${crunch.join("")} ${this.lastName}`;
    this.forwardAbbreviatedName = forwardAbbreviatedName;
    return forwardAbbreviatedName;
  }
}




module.exports = Contributor;