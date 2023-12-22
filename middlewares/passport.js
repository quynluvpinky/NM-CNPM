const passport = require('passport');
const MyStrategy = require('../utilities/customSPP');
const Admin = require('../models/Admin');
passport.serializeUser((admin ,done) => {
    done(null,admin.username);
});
passport.deserializeUser(async (username, done)=> {
    const admin = await Admin.getOneByUsername(username);
    if(!admin) {
        return done('invalid',null);
    }
    done(null,admin);
})
module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new MyStrategy(async (username, password,done)=> {
        const admin =await Admin.getOneByUsername(username);
        let auth = false;
        if(admin) {
            auth = (admin.password === password);
        }
        if(auth){
            return done(null,admin);
        }
        done('invalid path');
    },{
        username: 'username',
        password: 'password'
    }));
}