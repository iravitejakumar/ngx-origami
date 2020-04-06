"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var util_1 = require("util");
var ts_util_1 = require("../ts-util");
var existsAsync = util_1.promisify(fs.exists);
function getAngularJsonPath() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var angularJsonPath, angularCliJsonPath;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    angularJsonPath = path.resolve('./angular.json');
                    angularCliJsonPath = path.resolve('./.angular-cli.json');
                    return [4 /*yield*/, existsAsync(angularJsonPath)];
                case 1:
                    if (!_a.sent()) return [3 /*break*/, 2];
                    return [2 /*return*/, angularJsonPath];
                case 2: return [4 /*yield*/, existsAsync(angularCliJsonPath)];
                case 3:
                    if (_a.sent()) {
                        return [2 /*return*/, angularCliJsonPath];
                    }
                    else {
                        throw new Error('Unable to find angular.json or .angular-cli.json in current directory');
                    }
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.getAngularJsonPath = getAngularJsonPath;
function getAngularJson() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = require;
                    return [4 /*yield*/, getAngularJsonPath()];
                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent()])];
            }
        });
    });
}
exports.getAngularJson = getAngularJson;
function isAngularJson(json) {
    return json && !!json.projects;
}
exports.isAngularJson = isAngularJson;
function isAngularJsonProject(json) {
    return json && !!json.architect;
}
exports.isAngularJsonProject = isAngularJsonProject;
function isAngularCliJson(json) {
    return json && Array.isArray(json.apps);
}
exports.isAngularCliJson = isAngularCliJson;
function isAngularJsonEs5(json, type) {
    var architect = json.architect[type];
    if (architect) {
        return isEs5(path.resolve(json.root, architect.options.tsConfig));
    }
    else {
        return false;
    }
}
exports.isAngularJsonEs5 = isAngularJsonEs5;
function isAngularCliJsonEs5(json) {
    return isEs5(path.resolve(json.root, json.tsconfig));
}
exports.isAngularCliJsonEs5 = isAngularCliJsonEs5;
function isEs5(tsconfigPath) {
    var options = ts_util_1.getCompilerOptions(tsconfigPath);
    return !options.target || options.target === ts.ScriptTarget.ES5;
}
exports.isEs5 = isEs5;
function getRelativeNodeModulesPath(json) {
    return path.relative(path.resolve(json.root), path.resolve('./node_modules/'));
}
exports.getRelativeNodeModulesPath = getRelativeNodeModulesPath;
