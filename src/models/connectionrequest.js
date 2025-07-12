const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // ✅ This was the fix
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["ignored", "intrested", "accepted", "rejected"],
      message: `{VALUE} is incorrect status type`
    },
  },
}, { timestamps: true });

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
