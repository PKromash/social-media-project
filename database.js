import mongoose from "mongoose";

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (mongoose.connection.readyState !== 0) {
    console.log("Already connected to MongoDB");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://PKromash:Chessmaster04@cluster0.om3mhpa.mongodb.net/blog-project?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "social-media-app",
      }
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
