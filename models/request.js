const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Book",
    required:[true,"book id is required"]
  },
  requestedTo: {
      type:String,
      required:[true, "requestedBy is required"]
  },
  requestedFrom: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:[true, "requestedFrom is required"]
  },
  fromDate: {
    type: Date,
    required: [true, "fromDate is required."]
  },
  toDate:{
    type: Date,
    required: [true, "toDate is required."]
  },
  status:{
    type:String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default:'Pending'
  },
  comments:String
}
, {
  timestamps: true,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;