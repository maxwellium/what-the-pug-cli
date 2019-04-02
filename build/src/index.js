"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const what_the_pug_1 = require("what-the-pug");
const util_1 = require("util");
const fs_1 = require("fs");
const OPTIONS = {
    IN: '-i',
    OUT: '-o',
    ENCODING: 'utf8'
};
const readFileAsync = util_1.promisify(fs_1.readFile), writeFileAsync = util_1.promisify(fs_1.writeFile);
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const [, , ...args] = process.argv;
        let filenameIn = '', filenameOut = '';
        for (let i = 0; i < args.length - 1; i++) {
            if (OPTIONS.IN === args[i]) {
                filenameIn = args[i + 1];
            }
            if (OPTIONS.OUT === args[i]) {
                filenameOut = args[i + 1];
            }
        }
        const input = yield (filenameIn.length ? readFileAsync(filenameIn, OPTIONS.ENCODING) : stdin());
        const output = what_the_pug_1.transform(input).join('\n');
        filenameOut.length ? yield writeFileAsync(filenameOut, output, OPTIONS.ENCODING) : process.stdout.write(output);
    });
}
function stdin() {
    return new Promise((resolve, reject) => {
        let data = '';
        process.stdin.setEncoding(OPTIONS.ENCODING);
        process.stdin.on('error', reject);
        process.stdin.on('readable', () => {
            let chunk;
            while ((chunk = process.stdin.read()) !== null) {
                data += chunk;
            }
        });
        process.stdin.on('end', () => resolve(data));
    });
}
main();
//# sourceMappingURL=index.js.map