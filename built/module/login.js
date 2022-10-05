"use strict";
exports.__esModule = true;
exports.loginParse = void 0;
var httptree_1 = require("httptree");
var crypto_1 = require("crypto");
var SHA512 = function (txt) { return (0, crypto_1.createHash)('sha256').update(txt).digest('hex'); };
var Session = /** @class */ (function () {
    function Session(salt, maxAge) {
        if (maxAge === void 0) { maxAge = 3600; }
        this.salt = salt;
        this.sessionDict = {};
        this.maxAge = maxAge;
    }
    Session.prototype.parse = function (sessionStr) {
        if (!this.sessionDict[sessionStr])
            throw ('존재X');
        if (this.sessionDict[sessionStr].maxAge < new Date())
            throw ('기한 만료');
        return this.sessionDict[sessionStr];
    };
    Session.prototype["new"] = function () {
        var str = SHA512(this.salt + Math.random().toString() + (new Date()));
        while (str in this.sessionDict)
            str = SHA512(this.salt + Math.random().toString() + (new Date()));
        var data = {
            login: null,
            maxAge: new Date(Date.now() + this.maxAge * 1000)
        };
        this.sessionDict[str] = data;
        return str;
    };
    Session.prototype.delOverMaxAge = function () {
        for (var key in this.sessionDict) {
            if (this.sessionDict[key].maxAge < new Date())
                delete this.sessionDict[key];
        }
    };
    return Session;
}());
var session = new Session('qwer');
var loginHp = new httptree_1.Server();
var $auth = loginHp.p('a').p('auth');
$auth.p('login').post(function (req, res, obj) {
    var _a = req.body('json'), email = _a.email, pw = _a.pw;
});
$auth.p('signup').post(function (req, res, obj) {
    var _a = req.body('json'), email = _a.email, pw = _a.pw;
});
$auth.p('addinfo').post(function (req, res, obj) {
    var _a = req.body('json'), email = _a.email, pw = _a.pw;
});
var loginParse = function (req, res) {
    var cookie = httptree_1.addon.parseCookie(req.headers['cookie']);
    var sessionRawData = cookie['session'];
    console.log('loginParse');
    try {
        if (!sessionRawData)
            throw ('존재X임');
        var login = session.parse(sessionRawData).login;
        if (login === null)
            return loginHp.parse(req, res, undefined);
        else
            return login;
    }
    catch (_a) {
        res.setHeader('Set-Cookie', ["session=".concat(session["new"](), "; Max-Age=").concat(session.maxAge, "; SameSite=Strict; HttpOnly; ")]);
        return loginHp.parse(req, res, undefined);
    }
};
exports.loginParse = loginParse;
