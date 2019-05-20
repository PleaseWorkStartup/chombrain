"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = require("./File");
var Renderer = (function () {
    function Renderer(filename, replace) {
        if (replace === void 0) { replace = true; }
        this.file = new File_1.default(filename);
        this.replace = replace;
        if (replace)
            this.file.empty();
    }
    Renderer.prototype.render = function () {
        if (this.replace || !this.file.exist())
            this.file.write(this.getRenderStr());
        this.renderParts();
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=Renderer.js.map