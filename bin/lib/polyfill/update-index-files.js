"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var parse5_1 = require("parse5");
var path = require("path");
var util_1 = require("util");
var util_2 = require("./util");
var readFileAsync = util_1.promisify(fs.readFile);
var writeFileAsync = util_1.promisify(fs.writeFile);
var ADAPTER_SCRIPT = '  <script src="node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js"></script>\n';
var LOADER_SCRIPT = '  <script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js" defer></script>\n';
function updateIndexFiles(appNames) {
    if (appNames === void 0) { appNames = []; }
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var json, indexFiles, name, project, architect, isEs5, indexPath, _a, _b, _i, indexFile, isEs5;
        return tslib_1.__generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, util_2.getAngularJson()];
                case 1:
                    json = _c.sent();
                    indexFiles = {};
                    if (util_2.isAngularJson(json)) {
                        // angular.json
                        for (name in json.projects) {
                            if (!appNames.length || appNames.indexOf(name) > -1) {
                                project = json.projects[name];
                                architect = project.architect.build;
                                if (architect) {
                                    isEs5 = util_2.isAngularJsonEs5(project, 'build');
                                    indexPath = path.resolve(project.root, architect.options.index);
                                    indexFiles[indexPath] = indexFiles[indexPath] || isEs5;
                                }
                            }
                        }
                    }
                    else {
                        // .angular-cli.json
                        json.apps.forEach(function (app) {
                            if (!appNames.length || appNames.indexOf(app.name) > -1) {
                                var isEs5 = util_2.isAngularCliJsonEs5(app);
                                var indexPath = path.resolve(app.root, app.index);
                                indexFiles[indexPath] = indexFiles[indexPath] || isEs5;
                            }
                        });
                    }
                    _a = [];
                    for (_b in indexFiles)
                        _a.push(_b);
                    _i = 0;
                    _c.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 5];
                    indexFile = _a[_i];
                    isEs5 = indexFiles[indexFile];
                    return [4 /*yield*/, updateIndexFile(indexFile, isEs5)];
                case 3:
                    _c.sent();
                    _c.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.updateIndexFiles = updateIndexFiles;
function updateIndexFile(indexFile, isEs5) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var indexHtmlStr, indexHtml, scriptDiv, scriptDivStr, adapterDiv, adapterDivStr, adapterScript, adapterScriptStr, insert, insertPointMatch, insertPoint;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFileAsync(indexFile, 'utf8')];
                case 1:
                    indexHtmlStr = _a.sent();
                    indexHtml = parse5_1.parse(indexHtmlStr, {
                        sourceCodeLocationInfo: true
                    });
                    scriptDiv = findNode(indexHtml, isWebComponentsLoaderScript);
                    if (scriptDiv) {
                        scriptDivStr = getHtmlSubstring(indexHtmlStr, scriptDiv);
                        indexHtmlStr = indexHtmlStr.split(scriptDivStr).join('');
                    }
                    adapterDiv = findNode(indexHtml, isDivWithCustomAdapter);
                    if (adapterDiv) {
                        adapterDivStr = getHtmlSubstring(indexHtmlStr, adapterDiv);
                        indexHtmlStr = indexHtmlStr.split(adapterDivStr).join('');
                    }
                    adapterScript = findNode(indexHtml, isAdapterScript);
                    if (adapterScript) {
                        adapterScriptStr = getHtmlSubstring(indexHtmlStr, adapterScript);
                        indexHtmlStr = indexHtmlStr.split(adapterScriptStr).join('');
                    }
                    insert = [isEs5 ? ADAPTER_SCRIPT : '', LOADER_SCRIPT].join('');
                    insertPointMatch = indexHtmlStr.match(/(<\/head>|<\/body>|<\/html>)/);
                    insertPoint = insertPointMatch
                        ? insertPointMatch.index
                        : indexHtmlStr.length;
                    indexHtmlStr =
                        indexHtmlStr.slice(0, insertPoint) +
                            insert +
                            indexHtmlStr.slice(insertPoint);
                    // clean up extra line breaks
                    indexHtmlStr = indexHtmlStr.replace(/(\n\s*?(?=\n)){2,}/g, '\n');
                    return [4 /*yield*/, writeFileAsync(indexFile, indexHtmlStr, 'utf8')];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function findNode(node, predicate) {
    if (predicate(node)) {
        return node;
    }
    else if (hasChildren(node)) {
        var found_1;
        node.childNodes.some(function (childNode) {
            found_1 = findNode(childNode, predicate);
            return !!found_1;
        });
        return found_1;
    }
}
function isDivWithCustomAdapter(node) {
    if (node.nodeName === 'div' && hasChildren(node)) {
        return node.childNodes.some(function (childNode) {
            return isAdapterScript(childNode);
        });
    }
    else {
        return false;
    }
}
function isAdapterScript(node) {
    if (node.nodeName === 'script' && hasAttrs(node)) {
        return node.attrs.some(function (attr) {
            return (attr.name === 'src' &&
                attr.value.indexOf('custom-elements-es5-adapter') > -1);
        });
    }
    else {
        return false;
    }
}
function isWebComponentsLoaderScript(node) {
    if (node.nodeName === 'script' && hasAttrs(node)) {
        return node.attrs.some(function (attr) {
            return (attr.name === 'src' && attr.value.indexOf('webcomponents-loader') > -1);
        });
    }
    else {
        return false;
    }
}
function hasChildren(node) {
    return Array.isArray(node.childNodes);
}
function hasAttrs(node) {
    return Array.isArray(node.attrs);
}
function getHtmlSubstring(html, node) {
    return html.substring(node.sourceCodeLocation.startOffset, node.sourceCodeLocation.endOffset);
}
