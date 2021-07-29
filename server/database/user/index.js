import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ detail: { type: String }, for: { type: String } }], //detail contains address and for contains the type i.e. work or home
    phoneNumber: [{ type: Number }],
});

export const UserModel = mongoose.model("Users", UserSchema);