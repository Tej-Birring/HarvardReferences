const ck = require("check-types")
const t = require("./types")

module.exports = (obj, schema) => {
    if (!ck.nonEmptyObject(obj) || !ck.nonEmptyObject(schema) || !schema.isSchema)
        console.error("Incorrect input parms: ", {obj: obj, schema: schema});

    let isFail = false; 
    Object.entries(schema).forEach( entry => {
        const [key, spec] = entry;
        const val = obj[key];

        // check if required entry is present
        if (spec.required) {
            isFail |= !val;
            if (!val) console.error(`Error. '${key}' is required. Value read: '${val}'`);
        }
        
        if (!val) return;

        // check if types match
        switch (spec.type) {
            case t.String: 
                isFail |= !ck.string(val);
                if (!ck.string(val)) console.log(`Error in ${obj.id}. Expected (non-empty) string for '${key}'! Value read: '${val}' of type ${typeof val}`);
                break;
            case t.Integer:
                isFail |= !ck.integer(val);
                if (!ck.integer(val)) console.log(`Error in ${obj.id}. Expected integer for '${key}'! Value read: '${val}' of type ${typeof val}`);
                break;
            case t.Date:
                isFail |= !ck.date(val);
                if (!ck.date(val)) console.log(`Error in ${obj.id}. Expected date for '${key}'! Value read: '${val}' of type ${typeof val}`);
                break;
            case t.ArrayOfStrings:
                isFail |= !ck.array(val);
                const contentCheck = val.reduce((pVal, cVal) => pVal |= !ck.nonEmptyString(cVal), false ); // will return true if any non-non-empty strings in array!
                isFail |= contentCheck;
                if (!ck.array(val) || contentCheck) console.log(`Error in ${obj.id}. Expected array of (non-empty) strings for '${key}'! Value read: '${val}' of type ${typeof val}`);
                break;
            default:
                console.error("Unrecognized type! ", spec.type);
        }

        // verify value with custom function if specified
        if (!!spec.fVerifyVal) 
            isFail |= !spec.fVerifyVal(val);
    });

    return isFail;
}