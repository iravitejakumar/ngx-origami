"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = require("path");
var file_util_1 = require("../file-util");
var util_1 = require("./util");
function addPolyfillAssets(appNames) {
    if (appNames === void 0) { appNames = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var json, _loop_1, name, _a;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, util_1.getAngularJson()];
                case 1:
                    json = _b.sent();
                    if (util_1.isAngularJson(json)) {
                        _loop_1 = function (name) {
                            if (!appNames.length || appNames.indexOf(name) > -1) {
                                var project_1 = json.projects[name];
                                var nodeModules_1 = util_1.getRelativeNodeModulesPath(project_1);
                                var types = ['build', 'test'];
                                types.forEach(function (type) {
                                    var architect = project_1.architect[type];
                                    if (architect) {
                                        var isEs5 = util_1.isAngularJsonEs5(project_1, type);
                                        architect.options.assets = updateAssets(architect.options.assets, nodeModules_1, isEs5);
                                    }
                                });
                            }
                        };
                        // angular.json
                        for (name in json.projects) {
                            _loop_1(name);
                        }
                    }
                    else {
                        // .angular-cli.json
                        json.apps.forEach(function (app) {
                            if (!appNames.length || appNames.indexOf(app.name) > -1) {
                                var nodeModules = util_1.getRelativeNodeModulesPath(app);
                                var isEs5 = util_1.isAngularCliJsonEs5(app);
                                app.assets = updateAssets(app.assets, nodeModules, isEs5);
                            }
                        });
                    }
                    _a = file_util_1.writeJson;
                    return [4 /*yield*/, util_1.getAngularJsonPath()];
                case 2: return [4 /*yield*/, _a.apply(void 0, [_b.sent(), json])];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.addPolyfillAssets = addPolyfillAssets;
function updateAssets(assets, nodeModules, isEs5) {
    // Remove old polyfill assets
    assets = assets.filter(function (asset) {
        if (typeof asset === 'string') {
            return asset.indexOf('webcomponentsjs') === -1;
        }
        else {
            return asset.input.indexOf('webcomponentsjs') === -1;
        }
    });
    assets.push({
        glob: isEs5
            ? '{*loader.js,*adapter.js,bundles/*.js}'
            : '{*loader.js,bundles/*.js}',
        input: path.join(nodeModules, '@webcomponents/webcomponentsjs/'),
        output: 'node_modules/@webcomponents/webcomponentsjs'
    });
    return assets;
}
