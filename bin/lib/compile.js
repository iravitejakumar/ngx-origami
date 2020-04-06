"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var file_util_1 = require("./file-util");
var log_1 = require("./log");
var ts_util_1 = require("./ts-util");
exports.ES5_DIR_NAME = '_origami-es5';
exports.ES2015_DIR_NAME = '_origami-es2015';
function getEs5Dir(packagePath) {
    return path.join(packagePath, exports.ES5_DIR_NAME);
}
exports.getEs5Dir = getEs5Dir;
function getEs2015Dir(packagePath) {
    return path.join(packagePath, exports.ES2015_DIR_NAME);
}
exports.getEs2015Dir = getEs2015Dir;
function compile(packagePath, opts) {
    if (opts === void 0) { opts = {}; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var jsFiles, program, emitResult, allDiagnostics, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    if (isCompiled(packagePath) && !opts.force) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, file_util_1.getFilesWithExt('.js', packagePath, {
                            excludeDir: [exports.ES5_DIR_NAME, exports.ES2015_DIR_NAME]
                        })];
                case 1:
                    jsFiles = _a.sent();
                    if (!jsFiles.length) {
                        return [2 /*return*/, false];
                    }
                    return [4 /*yield*/, file_util_1.copyFolder(packagePath, getEs2015Dir(packagePath), {
                            include: jsFiles,
                            excludeDir: [exports.ES5_DIR_NAME, exports.ES2015_DIR_NAME]
                        })];
                case 2:
                    _a.sent();
                    program = ts.createProgram(jsFiles, {
                        allowJs: true,
                        importHelpers: true,
                        module: ts.ModuleKind.ES2015,
                        moduleResolution: ts.ModuleResolutionKind.NodeJs,
                        noEmitOnError: true,
                        outDir: getEs5Dir(packagePath),
                        skipLibCheck: true,
                        target: ts.ScriptTarget.ES5
                    });
                    emitResult = program.emit();
                    if (emitResult.emitSkipped) {
                        allDiagnostics = ts
                            .getPreEmitDiagnostics(program)
                            .concat(emitResult.diagnostics);
                        throw new Error(ts_util_1.getDiagnosticsMessage(allDiagnostics));
                    }
                    return [2 /*return*/, true];
                case 3:
                    error_1 = _a.sent();
                    log_1.warn('Failed to compile()');
                    throw error_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.compile = compile;
function isCompiled(packagePath) {
    return fs.existsSync(getEs5Dir(packagePath));
}
