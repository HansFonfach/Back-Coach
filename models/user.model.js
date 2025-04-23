import mongoose, { mongo } from "mongoose";
const UserSchema = new mongoose.Schema({
  correo: String,
  password: String, // Encriptada con bcryptjs
});

export default mongoose.model("User", UserSchema);
