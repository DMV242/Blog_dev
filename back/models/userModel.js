const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "you need to provide email"],
    validate: [validator.isEmail, "You need to provide valide email"],
  },
  password: {
    type: String,
    required: [true, "you need to provide a pasword"],
    minlength: 8,
    select: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  activateAccountToken: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
 if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  CandidatePassword,
  password
) {
  return await bcrypt.compare(CandidatePassword, password);
};

userSchema.methods.createActivateAccountToken = function () {
  const randomBytes = crypto.randomBytes(20).toString("hex");
  const token = crypto.createHash("sha256").update(randomBytes).digest("hex");
  this.activateAccountToken = token;
  return randomBytes;
};

export const UserModel = mongoose.model("user", userSchema);
