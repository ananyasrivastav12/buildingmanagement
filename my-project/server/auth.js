import passport from 'passport';
import passportLocal from 'passport-local';
import * as users from './users.js';

const { Strategy } = passportLocal;

const strategy = new Strategy(async (username, password, done) => {
    const flag = await users.findUser(username);
    if(!flag[0]){
        return done(null, false, {message: 'Wrong Username'});
    }
    const valid = await users.validatePassword(username, password);
    if(!valid){
        await new Promise((r) => setTimeout(r, 2000));
        return done(null, false, {message: 'Wrong Password'});
    }
    return done(null, username);
});

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((uid, done) => {
    done(null, uid);
});

export default {
    configure: (app) => {
        app.use(passport.initialize());
        app.use(passport.session());
    },

    authenticate: (domain, where) => {
        return passport.authenticate(domain, where);
    }
};