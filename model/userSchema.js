const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  mobile_number: {
    type: Number,
    unique: true,
  },
  name: {
    type: String,
  },
  society: {
    type: String,
  },
  password: {
    type: String,
  },
  otp: {
    type: String,
  },
  role: {
    type: String,
    default: "USER",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }

  next();
});

const qrUser = mongoose.model("qrUser", userSchema);
module.exports = qrUser;
