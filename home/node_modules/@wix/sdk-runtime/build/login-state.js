export var LoginState;
(function (LoginState) {
    LoginState["SUCCESS"] = "SUCCESS";
    LoginState["INITIAL"] = "INITIAL";
    LoginState["FAILURE"] = "FAILURE";
    LoginState["EMAIL_VERIFICATION_REQUIRED"] = "EMAIL_VERIFICATION_REQUIRED";
    LoginState["OWNER_APPROVAL_REQUIRED"] = "OWNER_APPROVAL_REQUIRED";
    LoginState["USER_CAPTCHA_REQUIRED"] = "USER_CAPTCHA_REQUIRED";
    LoginState["SILENT_CAPTCHA_REQUIRED"] = "SILENT_CAPTCHA_REQUIRED";
})(LoginState || (LoginState = {}));
