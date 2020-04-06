#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ProgressBar = require("progress");
var yargs = require("yargs");
var log_1 = require("./lib/log");
var polyfill_1 = require("./lib/polyfill/polyfill");
var prepare_1 = require("./lib/prepare");
var package_util_1 = require("./lib/package-util");
yargs
    .command('prepare <target> <packages...>', 'Prepare dependencies for ES5 or ES2015 building', function (yargs) {
    return yargs
        .positional('target', {
        describe: 'compile target',
        choices: ['es5', 'es2015', 'es6']
    })
        .positional('packages', {
        describe: 'packages to prepare',
        type: 'string'
    })
        .option('force', {
        alias: 'f',
        describe: 'force re-compile',
        type: 'boolean'
    });
}, function (argv) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var packagePaths, isEs5, target, progress, fatal, _i, packagePaths_1, packagePath, err_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                packagePaths = package_util_1.getPackagePaths(argv.packages);
                if (!!packagePaths.length) return [3 /*break*/, 1];
                log_1.error('There are no NPM package directories that match the paths', true);
                return [3 /*break*/, 8];
            case 1:
                isEs5 = argv.target === 'es5';
                target = isEs5 ? 'ES5' : 'ES2015';
                log_1.info("Preparing " + target + " dependencies");
                progress = new ProgressBar(':current/:total :bar', packagePaths.length);
                fatal = false;
                _i = 0, packagePaths_1 = packagePaths;
                _a.label = 2;
            case 2:
                if (!(_i < packagePaths_1.length)) return [3 /*break*/, 7];
                packagePath = packagePaths_1[_i];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                progress.tick();
                return [4 /*yield*/, prepare_1.prepare(packagePath, { es5: isEs5, force: argv.force })];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                fatal = true;
                console.log('\n');
                log_1.error(err_1, true);
                return [3 /*break*/, 6];
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7:
                if (!fatal) {
                    log_1.info(target + " dependencies ready");
                }
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); })
    .command('polyfill [appNames...]', 'Add polyfills to all or the specified apps', function (yargs) {
    return yargs.positional('appNames', {
        describe: 'angular.json or .angular-cli.json projects/apps to polyfill'
    });
}, function (argv) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var err_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, polyfill_1.polyfill(argv.appNames)];
            case 1:
                _a.sent();
                if (argv.appNames.length) {
                    log_1.info("Added polyfills to " + argv.appNames.join(','));
                }
                else {
                    log_1.info('Added polyfills to all apps');
                }
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                log_1.error(err_2);
                log_1.error('Failed to add polyfills', true);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })
    .help()
    .demandCommand()
    .parse();
