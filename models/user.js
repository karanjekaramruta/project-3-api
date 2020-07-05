const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: {
    type: String,
    required:[true,"firstname is required"]
  },
  lastname: {
    type: String,
    required:[true,'lastname is required']
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  listOfOwnedBooks:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book"
  }],
  postalCode:{
    type:String
  }
}, 
{
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;