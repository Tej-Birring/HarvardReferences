const sanitise_whitespace = (str) => {
    return str.replace(/\s+/g, " ");
}

module.exports = {
    sanitise_whitespace
}