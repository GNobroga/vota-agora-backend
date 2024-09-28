"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _core = require("@nestjs/core");
const _appmodule = require("./app.module");
const _appconfig = /*#__PURE__*/ _interop_require_default(require("./modules/shared/app.config"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function bootstrap() {
    const app = await _core.NestFactory.create(_appmodule.AppModule);
    const port = app.get(_appconfig.default).getApplicationPort();
    app.setGlobalPrefix("api");
    app.enableVersioning();
    await app.listen(port);
}
bootstrap();

//# sourceMappingURL=main.js.map