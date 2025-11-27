const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      console.log('📝 Please add your MongoDB Atlas connection string to server/.env');
      console.log('   Example: MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/my-cafe');
      console.log('⚠️  Server will continue without database connection');
      return;
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options are no longer needed in newer versions of Mongoose
      // but keeping for compatibility
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    console.log('💡 Make sure your MongoDB Atlas connection string is correct in server/.env');
    console.log('⚠️  Server will continue without database connection');
    // Don't exit - let server start anyway for development
  }
};

module.exports = connectDB;

