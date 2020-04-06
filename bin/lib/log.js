"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
function info(message) {
    log(message, chalk_1.default.white);
}
exports.info = info;
function warn(message) {
    log(message, chalk_1.default.yellow);
}
exports.warn = warn;
function error(message, fatal) {
    log(message instanceof Error ? message.stack : message, chalk_1.default.red);
    if (fatal) {
        process.exit(1);
    }
}
exports.error = error;
function getPrefix() {
    return chalk_1.default.cyan('Origami: ');
}
exports.getPrefix = getPrefix;
function log(message, color) {
    console.log(getPrefix() + color(message));
}
