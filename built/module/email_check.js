var EmailCheck = /** @class */ (function () {
    function EmailCheck() {
        this.registered_list = [];
        this.registered_list = [];
    }
    return EmailCheck;
}());
var emaildata = /** @class */ (function () {
    function emaildata(email, callback) {
        this.count_max = 5;
        this.email = email;
        this.registered = false;
        this.count = 0;
        this.vrification_number = (Math.random() * 100000) | 0;
        this.send_virification_email();
    }
    emaildata.prototype.send_virification_email = function () {
        //TODO 이메일 보내기.
    };
    emaildata.prototype.rciv = function () {
        return true;
    };
    return emaildata;
}());
