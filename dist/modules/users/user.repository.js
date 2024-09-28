"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    USER_REPOSITORY_TOKEN: function() {
        return USER_REPOSITORY_TOKEN;
    },
    default: function() {
        return UserRepository;
    }
});
const _common = require("@nestjs/common");
const _mongoose = require("@nestjs/mongoose");
const _mongoose1 = require("mongoose");
const _userschema = require("./user.schema");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
function _ts_param(paramIndex, decorator) {
    return function(target, key) {
        decorator(target, key, paramIndex);
    };
}
const USER_REPOSITORY_TOKEN = 'IUserRepository';
let UserRepository = class UserRepository {
    async findAll(paginator) {
        const skip = (paginator.page - 1) * paginator.size;
        const users = await this._userModel.find().sort({
            '_id': paginator.sort === 'desc' ? -1 : 1
        }).skip(skip).limit(paginator.size);
        return users.map((doc)=>doc.toObject());
    }
    async findByDocument(document) {
        try {
            const result = await this._userModel.findOne({
                document
            });
            return result.toObject();
        } catch (error) {
            return null;
        }
    }
    async create(record) {
        const createdUser = await this._userModel.create(record);
        return await createdUser.save();
    }
    constructor(_userModel){
        this._userModel = _userModel;
    }
};
UserRepository = _ts_decorate([
    (0, _common.Injectable)(),
    _ts_param(0, (0, _mongoose.InjectModel)(_userschema.User.name)),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _mongoose1.Model === "undefined" ? Object : _mongoose1.Model
    ])
], UserRepository);

//# sourceMappingURL=user.repository.js.map