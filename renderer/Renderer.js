import File from './File';
class Renderer {
    constructor(filename, replace = true) {
        this.file = new File(filename);
        this.replace = replace;
        if (replace)
            this.file.empty();
    }
    render() {
        if (this.replace || !this.file.exist())
            this.file.write(this.getRenderStr());
        this.renderParts();
    }
}
export default Renderer;
//# sourceMappingURL=Renderer.js.map