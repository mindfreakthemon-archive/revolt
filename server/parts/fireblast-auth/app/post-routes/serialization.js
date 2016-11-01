import passport from 'passport';
import mongoose from 'mongoose';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	mongoose.model('User').findById(id, done);
});
