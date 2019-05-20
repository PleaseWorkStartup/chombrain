"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Relation = (function () {
    function Relation() {
        this.isMorph = false;
        this.onDelete = "RESTRICT";
    }
    Relation.prototype.parentFilled = function () {
        if (this.parentTable || this.parentColumn || this.parentName)
            return true;
        else
            return false;
    };
    return Relation;
}());
exports.default = Relation;
//# sourceMappingURL=relation.js.map