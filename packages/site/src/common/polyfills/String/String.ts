/**
 * toWords
 */
const wordPattern = new RegExp(["[A-Z][a-z]+", "[A-Z]+(?=[A-Z][a-z])", "[A-Z]+", "[a-z]+", "[0-9]+"].join("|"), "g");
String.prototype.toWords = function (this: string, pattern?: RegExp | string) {
    if (pattern === undefined) {
        return this.match(wordPattern) || [];
    }
    return this.match(pattern) || [];
};

/**
 * upperFirst
 */
String.prototype.upperFirst = function (this: string) {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

/**
 * capitalize
 */
String.prototype.capitalize = function (this: string) {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

/**
 * toCamelCase
 */
String.prototype.toCamelCase = function (this: string) {
    return this.toWords()
        .map((word, index) => (index === 0 ? word.toLowerCase() : word.toLowerCase().upperFirst()))
        .join("");
};

export {};
