import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        requried: true,
    },
    password: {
        type: String,
        requried: true,
    },
   randomString:{
    type: String,
   },
   token:{
    type: String,
   },
});

const User = mongoose.model("User", userSchema);

export default User;