"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("./core/messages");
const cli_1 = require("./core/cli");
const configService_1 = require("./services/configService");
if (configService_1.checkEnvVariables) {
    messages_1.messages.welcome();
    (0, cli_1.run)().then();
}
//# sourceMappingURL=index.js.map