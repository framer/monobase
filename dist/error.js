"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var React = require("react");
var Markdown = require("react-markdown");
exports.render = function (error, project) {
    var projectPath = project.path;
    var modulePath = path.resolve(path.join(__dirname, ".."));
    var css = "\nbody { font: 14px/1.5em Helvetica Neue; color: rgba(0, 0, 0, 0.7); margin: 0 }\na { color: rgba(0, 0, 0, 0.85); }\npre, code { font: 12px/1.5em Menlo; color: whitespace: pre-wrap }\nh2 { font: 18px/1.5em 'Helvetica Neue Bold' }\nsection { padding: 10px 20px; overflow: auto }\n";
    var shortPath = function (text) {
        return text
            .replace(new RegExp(projectPath, "g"), "<project>")
            .replace(new RegExp(modulePath, "g"), "<monobase>");
    };
    return (React.createElement("html", null,
        React.createElement("head", null,
            React.createElement("style", null, css)),
        React.createElement("body", null,
            React.createElement("section", { style: {
                    background: "rgba(255, 254, 197, 1.00)",
                    borderBottom: "1px solid hsla(0, 0%, 0%, 0.05)"
                } },
                React.createElement("h2", null, "Error 500"),
                React.createElement("p", null,
                    React.createElement(Markdown, { source: shortPath(error.message) })),
                React.createElement("p", null,
                    "Project: ",
                    React.createElement("code", null, projectPath),
                    React.createElement("br", null),
                    "Monobase: ",
                    React.createElement("code", null, modulePath))),
            React.createElement("section", { style: { marginBottom: 32 } },
                React.createElement("pre", { style: {
                        color: "grey"
                    } }, shortPath(error.stack))),
            React.createElement("section", { style: {
                    position: "fixed",
                    width: "100%",
                    bottom: 0,
                    background: " rgba(238, 238, 238, 1.00)",
                    borderTop: "1px solid rgba(0, 0, 0, 0.05)",
                    fontSize: "90%",
                    height: 24
                } }, "Monobase"))));
};
