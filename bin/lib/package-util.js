"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var glob = require("glob");
var path = require("path");
function getPackagePaths(patterns) {
    var paths = [];
    patterns.forEach(function (pattern) {
        paths.push.apply(paths, glob.sync(pattern));
    });
    return paths.filter(function (p) { return isPackagePath(p); }).map(function (p) { return path.resolve(p); });
}
exports.getPackagePaths = getPackagePaths;
function isPackagePath(packagePath) {
    return (fs.existsSync(packagePath) &&
        fs.statSync(packagePath).isDirectory() &&
        fs.existsSync(getPackageJsonPath(packagePath)));
}
exports.isPackagePath = isPackagePath;
function getPackageJsonPath(packagePath) {
    return path.join(packagePath, 'package.json');
}
exports.getPackageJsonPath = getPackageJsonPath;
function getPackageJson(packagePath) {
    return JSON.parse(fs.readFileSync(getPackageJsonPath(packagePath), 'utf8'));
}
exports.getPackageJson = getPackageJson;
