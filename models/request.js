const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema({
  bookId: {
    type: String,
  },
  requestedBy: {
      type:String,
      required:[true, "requestedBy is required"]
  },
  requestedFrom: {
    type:String,
    required:[true, "requestedFrom is required"]
  },
  fromDate: {
    type: Date,
    required: [true, "fromDate is required."]
  },
  toDate:[{
    type: Date,
    required: [true, "toDate is required."]
  }],
  status:String,
}, {
  timestamps: true,
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;