const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // For password hashing

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    unique: true, 
    required: true, 
    trim: true, 
    minlength: 3, 
    maxlength: 30 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 // Enforce minimum password length
  },
}, { timestamps: true });

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if the password is modified
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords during login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;