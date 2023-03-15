import mongoose from "mongoose";
import * as yup from "yup";

const usersSchema = new mongoose.Schema(
  {
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
    phoneNumber: {
      type: String,
      validate: {
        validator: function (value) {
          const phoneRegex =
            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
          return phoneRegex.test(value);
        },
        message: `{VALUE} is not a valid phone!`,
      },
    },
    address: { type: String, default: "" },
    birthday: { type: Date },
    role: { type: String, default: "user" }, // user, admin,
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    avatar: { type: String, default: "" },
  },
  { timestamps: true }
);
// Virtuals
usersSchema.virtual("fullName").get(function () {
  return this.firstName + " " + this.lastName;
});
usersSchema.set("toJSON", { virtuals: true });
const Users = mongoose.models.users || mongoose.model("users", usersSchema);
export default Users;
