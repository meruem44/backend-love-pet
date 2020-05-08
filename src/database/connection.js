import 'dotenv/config';

import mongoose from 'mongoose';

class Connection {
    constructor() {
        mongoose.connect(process.env.MONGO_CONNECTION,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

}

export default new Connection();