const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  recipient: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  text: { 
    type: String, 
    trim: true, 
    maxlength: 1000 
  },
  file: { 
    type: String, 
    trim: true 
  },
}, { timestamps: true });


MessageSchema.index({ sender: 1 });
MessageSchema.index({ recipient: 1 });

const MessageModel = mongoose.model('Message', MessageSchema);

module.exports = MessageModel;