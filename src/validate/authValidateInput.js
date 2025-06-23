const validator = require('validator');

exports.emailValidate = (email)=>{
    if(!(validator.isEmail(email))){
        throw new Error("Provide valid email")
    }
}

exports.passwordValidate = (password)=>{
    if(!(validator.isStrongPassword(password))){
        throw new Error("Provide valid password")
    }
}