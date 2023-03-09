import mongoose from "mongoose";
import * as yup from "yup";

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (email) {
        const emailSchema = yup.object().shape({
          email: yup.string().email(),
        });
        return await emailSchema.validate({ email: email });
      },
    },
  },
  role: { type: String, default: "user" }, // user, admin,

  avatar: { type: String },
});
const Users = mongoose.models.users || mongoose.model("users", usersSchema);
export default Users;
