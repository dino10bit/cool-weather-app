"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLocation = void 0;
const tslib_1 = require("tslib");
const got_1 = (0, tslib_1.__importDefault)(require("got"));
const cli = (0, tslib_1.__importStar)(require("clui"));
const messages_1 = require("../core/messages");
async function findLocation() {
    const spinnerStatus = new cli.Spinner('Checking location. Please wait...');
    spinnerStatus.start();
    try {
        const response = await (0, got_1.default)('http://ip-api.com/json');
        spinnerStatus.stop();
        return JSON.parse(response.body);
    }
    catch (error) {
        spinnerStatus.stop();
        messages_1.messages.locationNotFound();
    }
}
exports.findLocation = findLocation;
//# sourceMappingURL=location.js.map