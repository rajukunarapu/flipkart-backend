const mongoose = require('mongoose');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({

    email : {
        unique : true,
        type : String,
        required : true,
        validate :{
            validator : function(value){
                validator.isEmail(value)
            },
            message : "{VALUE} is not a valid email"
        }
    },


    password : {
        type : String,
        required : true,
        validate : {
            validator : function(value){
                validator.isStrongPassword(value)
            },
            message : "{VALUE} is not a strong password"
        }
    }

})




userSchema.methods.generateToken = async function () {
    const token = await jwt.sign(
        { _id: this._id },
        `${process.env.JWT_SECRETE_KEY}`,
        { expiresIn: "7d" }
    );
    return token;
};

userSchema.methods.bcryptValidPassword = async function (password) {
    const isValidPassword = await bcrypt.compare(password, this.password)
    return isValidPassword
}


const User = mongoose.model('User', userSchema)

module.exports = {User}