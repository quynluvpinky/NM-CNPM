const {Strategy} = require('passport-strategy');
const passport = require('passport');
module.exports = class MyStrategy extends Strategy{
    constructor(verify, option){
        super();
        this.name = 'myS';
        this.verify = verify;
        this.usernameField = (option && option.username) ? option.username: 'username';
        this.passwordField = (option && option.password) ? option.password: 'password';
        passport.strategies[this.name] = this;  
    }
    authenticate(req, option){
        const un = req.body[this.usernameField];
        const pw = req.body[this.passwordField];
        this.verify(un,pw,(err,user)=> {
            if(err){
                return this.fail(err);
            }
            if(!user){
                return this.fail('invalid auth');
            }
            this.success(user);
        })
    }
}