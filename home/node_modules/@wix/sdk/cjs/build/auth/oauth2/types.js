"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRole = exports.LoginState = void 0;
const login_state_1 = require("@wix/sdk-runtime/login-state");
Object.defineProperty(exports, "LoginState", { enumerable: true, get: function () { return login_state_1.LoginState; } });
var TokenRole;
(function (TokenRole) {
    TokenRole["NONE"] = "none";
    TokenRole["VISITOR"] = "visitor";
    TokenRole["MEMBER"] = "member";
})(TokenRole || (exports.TokenRole = TokenRole = {}));
