import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  joinedAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "phone" });

const model = mongoose.model("User", UserSchema);

export default model;
