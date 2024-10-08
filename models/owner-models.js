const mongoose = require("mongoose");


const OwnerSchema = mongoose.Schema({
  fullname: {
    type: String,
    minlength: 2,
    trim: true,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", OwnerSchema);
