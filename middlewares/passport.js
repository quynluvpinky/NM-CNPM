const passport = require('passport');
const MyStrategy = require('../utilities/customSPP');
const AdminAccount = require('../models/TaiKhoanAdmin');
passport.serializeUser((admin ,done) => {
    done(null,admin.taikhoan);
});
passport.deserializeUser(async (username, done)=> {
    const admin = await AdminAccount.getOneByUsername(username);
    if(!admin) {
        return done('invalid',null);
    }
    done(null,admin);
})
module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new MyStrategy(async (username, password,done)=> {
        const acc =await AdminAccount.getOneByUsername(username);
        let auth = false;
        if(acc) {
            auth = (acc.matkhau === password);
        }
        if(auth){
            return done(null,acc);
        }
        done('invalid path');
    },{
        username: 'username',
        password: 'password'
    }));
}