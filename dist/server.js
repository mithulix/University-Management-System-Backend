"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server;
function mongoDBconnect() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(envConfig_1.default.database_url);
            console.log(`😂 database is connected successfully`);
            server = app_1.default.listen(envConfig_1.default.port, () => {
                console.log(`👽 Application listening on port: ${envConfig_1.default.port}`);
            });
        }
        catch (error) {
            console.log(`😥 failed to connect database`, error);
        }
    });
}
mongoDBconnect();
