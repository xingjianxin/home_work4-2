Event.prototype.once = function (eventName, callback) {
    var _this = this;
    function _callback() {
        callback.apply(_this, arguments);
        this.removeListener(eventName, _callback)
    }
    this.on(eventName, _callback)
};