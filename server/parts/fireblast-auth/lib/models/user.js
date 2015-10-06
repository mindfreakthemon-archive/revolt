import mongoose from 'mongoose';

import UserSchema from 'fireblast-auth/lib/schemas/user';

export default mongoose.model('User', UserSchema);