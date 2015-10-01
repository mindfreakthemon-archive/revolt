import passport from 'passport';

import User from 'fireblast-auth/lib/models/user';

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.findById(id, done);
});