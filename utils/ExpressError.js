class ExpressError extends Error {
    constructor(satusCode, message) {
        super();
        this.statusCode = statusCode;
        this.mesage = message;
    }
}

module.exports = ExpressError;