import * as path from 'path';
import * as fs from 'fs';
class File {
    constructor(p) {
        this.path = path.join(__dirname, p);
        this.filename = path.basename(this.path);
        this.dirname = path.dirname(this.path);
        if (!fs.existsSync(this.path)) {
            fs.mkdirSync(this.dirname, {
                recursive: true
            });
        }
    }
    exist() {
        return fs.existsSync(this.path);
    }
    read() {
        if (!fs.existsSync(this.path))
            return "";
        return fs.readFileSync(this.path, "utf8");
    }
    write(data) {
        fs.writeFileSync(this.path, data);
    }
    append(data) {
        fs.appendFileSync(this.path, data);
    }
    empty() {
        this.write("");
    }
}
export default File;
//# sourceMappingURL=File.js.map