"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var compile_1 = require("./compile");
var file_util_1 = require("./file-util");
function prepare(packagePath, opts) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, compile_1.compile(packagePath, opts)];
                case 1:
                    _a.sent();
                    if (!opts.es5) return [3 /*break*/, 3];
                    return [4 /*yield*/, file_util_1.copyFolder(compile_1.getEs5Dir(packagePath), packagePath)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, file_util_1.copyFolder(compile_1.getEs2015Dir(packagePath), packagePath)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.prepare = prepare;
