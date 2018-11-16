"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var _ErrorStatus = (function (_super) {
    tslib_1.__extends(_ErrorStatus, _super);
    function _ErrorStatus(text) {
        var _this = _super.call(this) || this;
        _this.message = text;
        _this.status = 0;
        return _this;
    }
    return _ErrorStatus;
}(Error));
exports._ErrorStatus = _ErrorStatus;
