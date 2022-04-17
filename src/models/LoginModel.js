const mongoose = require('mongoose');
const validator = require('validator');

const LoginScheme = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginScheme);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }
    
    async register() {
        this.validate();
        if(this.errors.length > 0) return;
        
        try {
            this.user = await LoginModel.create(this.body);
        } catch (e) {
            console.log('Ouve algum erro');
        }
    }

    validate () {
        this.cleanUp();
        // Validate
        // Email must be valid
        if(!validator.isEmail(this.body.email)) this.errors.push('Email is invalid');

        // Password must be between 8 to 16 characters
        if(this.body.password.length < 8 || this.body.password.length > 16) {
            this.errors.push('Password must be between 8 and 16 characters');
        }
    }

    cleanUp () {
        for(const key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Login;
