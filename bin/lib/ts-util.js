"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var ts = require("typescript");
function getCompilerOptions(tsconfigPath) {
    var readResult = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (readResult.error) {
        throw new Error(getDiagnosticsMessage([readResult.error]));
    }
    var parseResult = ts.parseJsonConfigFileContent(readResult.config, ts.sys, path.dirname(tsconfigPath));
    if (parseResult.errors.length) {
        throw new Error(getDiagnosticsMessage(parseResult.errors));
    }
    return parseResult.options;
}
exports.getCompilerOptions = getCompilerOptions;
function getDiagnosticsMessage(diagnostics) {
    return ts.formatDiagnosticsWithColorAndContext(diagnostics, {
        getCanonicalFileName: function (path) { return path; },
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: function () { return ts.sys.newLine; }
    });
}
exports.getDiagnosticsMessage = getDiagnosticsMessage;
