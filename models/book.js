const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    //required: [true, 'book title is mandatory']
  },
  subtitle: {
    type: String,
  },
  authors: [{
    type: String,
    //required: [true, 'author is mandatory']
  }],
  bookId:{
      type:String,
      //required: [true, 'book id is mandatory']
  },
  description: {
    type: String
  },
  publishedDate: {
    type:String
  },
  pageCount:{
      type:Number
  },
  averageRating:{
      type:Number
  },
  categories:[{
      type:String
  }],
  imageLinks:{},
  language:{
      type:String
  },
  price:{
    type:String
  },
  qty:{
    type:String
  }
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;