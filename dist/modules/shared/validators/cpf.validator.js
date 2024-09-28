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
    IsCpf: function() {
        return IsCpf;
    },
    IsCpfConstraint: function() {
        return IsCpfConstraint;
    }
});
const _classvalidator = require("class-validator");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let IsCpfConstraint = class IsCpfConstraint {
    validate(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        let sum = 0;
        let remainder;
        for(let i = 1; i <= 9; i++){
            sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
        }
        remainder = sum * 10 % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.charAt(9))) return false;
        sum = 0;
        for(let i = 1; i <= 10; i++){
            sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
        }
        remainder = sum * 10 % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        return remainder === parseInt(cpf.charAt(10));
    }
    defaultMessage() {
        return 'Invalid CPF';
    }
};
IsCpfConstraint = _ts_decorate([
    (0, _classvalidator.ValidatorConstraint)({
        async: false
    })
], IsCpfConstraint);
function IsCpf(validationOptions) {
    return function(object, propertyName) {
        (0, _classvalidator.registerDecorator)({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCpfConstraint
        });
    };
}

//# sourceMappingURL=cpf.validator.js.map