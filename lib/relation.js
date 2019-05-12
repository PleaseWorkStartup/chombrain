class Relation {
    constructor() {
        this.isMorph = false;
        this.onDelete = "RESTRICT";
    }
    parentFilled() {
        if (this.parentTable || this.parentColumn || this.parentName)
            return true;
        else
            return false;
    }
}
export default Relation;
//# sourceMappingURL=relation.js.map