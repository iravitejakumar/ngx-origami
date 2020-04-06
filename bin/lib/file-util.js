"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var path = require("path");
var util_1 = require("util");
var log_1 = require("./log");
var existsAsync = util_1.promisify(fs.exists);
var mkdirAsync = util_1.promisify(fs.mkdir);
var readdirAsync = util_1.promisify(fs.readdir);
var readFileAsync = util_1.promisify(fs.readFile);
var statAsync = util_1.promisify(fs.stat);
var writeFileAsync = util_1.promisify(fs.writeFile);
function copyFolder(fromDir, toDir, opts) {
    if (opts === void 0) { opts = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var names, _i, names_1, name, fileOrFolder, target, _a, _b, error_1;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 16, , 17]);
                    return [4 /*yield*/, existsAsync(toDir)];
                case 1:
                    if (!!(_c.sent())) return [3 /*break*/, 3];
                    return [4 /*yield*/, mkdirAsync(toDir)];
                case 2:
                    _c.sent();
                    _c.label = 3;
                case 3: return [4 /*yield*/, readdirAsync(fromDir)];
                case 4:
                    names = _c.sent();
                    _i = 0, names_1 = names;
                    _c.label = 5;
                case 5:
                    if (!(_i < names_1.length)) return [3 /*break*/, 15];
                    name = names_1[_i];
                    if (opts.excludeDir && opts.excludeDir.indexOf(name) > -1) {
                        return [3 /*break*/, 14];
                    }
                    fileOrFolder = path.join(fromDir, name);
                    target = path.join(toDir, name);
                    return [4 /*yield*/, statAsync(fileOrFolder)];
                case 6:
                    if (!(_c.sent()).isDirectory()) return [3 /*break*/, 11];
                    return [4 /*yield*/, existsAsync(target)];
                case 7:
                    if (!!(_c.sent())) return [3 /*break*/, 9];
                    return [4 /*yield*/, mkdirAsync(target)];
                case 8:
                    _c.sent();
                    _c.label = 9;
                case 9: return [4 /*yield*/, copyFolder(fileOrFolder, target, opts)];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 14];
                case 11:
                    if (!(!opts.include || opts.include.indexOf(fileOrFolder) > -1)) return [3 /*break*/, 14];
                    _a = writeFileAsync;
                    _b = [target];
                    return [4 /*yield*/, readFileAsync(fileOrFolder)];
                case 12: return [4 /*yield*/, _a.apply(void 0, _b.concat([_c.sent()]))];
                case 13:
                    _c.sent();
                    _c.label = 14;
                case 14:
                    _i++;
                    return [3 /*break*/, 5];
                case 15: return [3 /*break*/, 17];
                case 16:
                    error_1 = _c.sent();
                    log_1.warn('Failed to copyFolder()');
                    throw error_1;
                case 17: return [2 /*return*/];
            }
        });
    });
}
exports.copyFolder = copyFolder;
function getFilesWithExt(ext, directory, opts, allFiles) {
    if (opts === void 0) { opts = {}; }
    if (allFiles === void 0) { allFiles = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var directoryName, files, _i, files_1, file, absolutePath, error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    directoryName = path.basename(directory);
                    if (opts.excludeDir && opts.excludeDir.indexOf(directoryName) > -1) {
                        return [2 /*return*/, []];
                    }
                    return [4 /*yield*/, readdirAsync(directory)];
                case 1:
                    files = _a.sent();
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 7];
                    file = files_1[_i];
                    absolutePath = path.resolve(directory, file);
                    return [4 /*yield*/, statAsync(absolutePath)];
                case 3:
                    if (!(_a.sent()).isDirectory()) return [3 /*break*/, 5];
                    return [4 /*yield*/, getFilesWithExt(ext, absolutePath, opts, allFiles)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    if (path.extname(absolutePath) === ext) {
                        allFiles.push(absolutePath);
                    }
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/, allFiles];
                case 8:
                    error_2 = _a.sent();
                    log_1.warn('Failed to getFilesWithExt()');
                    throw error_2;
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.getFilesWithExt = getFilesWithExt;
function writeJson(path, json) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, writeFileAsync(path, JSON.stringify(json, null, 2) + "\n", 'utf8')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.writeJson = writeJson;
