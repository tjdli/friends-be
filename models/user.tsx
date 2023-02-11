const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    tags: {
        type: [Tag],
        required: true,
    },
    interests: {
        type: [Event],
        required: true,
    }
  }, {
    timestamps: true,
  });
  
const User = mongoose.model('User', userSchema);
  
module.exports = User;