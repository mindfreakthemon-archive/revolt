import mongoose from 'mongoose';

import GuestSchema from 'fireblast-auth/lib/schemas/guest';

export default mongoose.model('Guest', GuestSchema);