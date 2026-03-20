import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true                   
  },

  docid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true                    
  },

  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },

  message: {
    type: String,
    required: true,
    trim: true
  }

}, {
  timestamps: true
})

const ChatModel = mongoose.model("chat", chatSchema)

export default ChatModel