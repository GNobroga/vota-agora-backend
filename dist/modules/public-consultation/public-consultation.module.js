"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return PublicConsultationModule;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _publicconsultationschema = /*#__PURE__*/ _interop_require_wildcard(require("./schemas/public-consultation.schema"));
const _usecases = /*#__PURE__*/ _interop_require_default(require("./usecases"));
const _authmodule = /*#__PURE__*/ _interop_require_default(require("../auth/auth.module"));
const _publicconsultationrepositoryinterface = require("./interfaces/public-consultation-repository.interface");
const _publicconsultationrepository = /*#__PURE__*/ _interop_require_default(require("./public-consultation.repository"));
const _usermodule = /*#__PURE__*/ _interop_require_default(require("../users/user.module"));
const _publicconsultationcontroller = /*#__PURE__*/ _interop_require_default(require("./public-consultation.controller"));
const _publicconsultationvoteschema = /*#__PURE__*/ _interop_require_wildcard(require("./schemas/public-consultation-vote.schema"));
const _adminmodule = /*#__PURE__*/ _interop_require_default(require("../admin/admin.module"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let PublicConsultationModule = class PublicConsultationModule {
};
PublicConsultationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _authmodule.default,
            _usermodule.default,
            _adminmodule.default,
            _mongoose.MongooseModule.forFeature([
                {
                    name: _publicconsultationschema.default.name,
                    schema: _publicconsultationschema.PublicConsultationSchema
                },
                {
                    name: _publicconsultationvoteschema.default.name,
                    schema: _publicconsultationvoteschema.PublicConsultationVoteSchema
                }
            ])
        ],
        controllers: [
            _publicconsultationcontroller.default
        ],
        providers: [
            ..._usecases.default,
            {
                provide: _publicconsultationrepositoryinterface.PUBLIC_CONSULTATION_REPOSITORY_TOKEN,
                useClass: _publicconsultationrepository.default
            }
        ]
    })
], PublicConsultationModule);

//# sourceMappingURL=public-consultation.module.js.map