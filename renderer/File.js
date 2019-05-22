"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var File = (function () {
    function File(p) {
        this.path = p;
        this.filename = path.basename(this.path);
        this.dirname = path.dirname(this.path);
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.dirname, {
                recursive: true
            });
        }
    }
    File.prototype.exist = function () {
        return fs.existsSync(this.path);
    };
    File.prototype.read = function () {
        if (!fs.existsSync(this.path))
            return "";
        return fs.readFileSync(this.path, "utf8");
    };
    File.prototype.write = function (data) {
        fs.writeFileSync(this.path, data);
    };
    File.prototype.append = function (data) {
        fs.appendFileSync(this.path, data);
    };
    File.prototype.empty = function () {
        this.write("");
    };
    return File;
}());
exports.default = File;
//# sourceMappingURL=File.js.map