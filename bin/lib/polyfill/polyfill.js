"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var add_polyfill_assets_1 = require("./add-polyfill-assets");
var update_index_files_1 = require("./update-index-files");
function polyfill(appNames) {
    if (appNames === void 0) { appNames = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, add_polyfill_assets_1.addPolyfillAssets(appNames)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, update_index_files_1.updateIndexFiles(appNames)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.polyfill = polyfill;
