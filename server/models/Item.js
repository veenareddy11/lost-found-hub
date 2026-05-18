const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  

  description: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  image: {
  type: String
},

  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},

claimedBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  default: null
},

claimedAt: {
  type: Date,
  default: null
},

  status: {
    type: String,
    default: "Unclaimed"
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);