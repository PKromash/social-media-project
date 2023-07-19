import {Schema, model, models} from "mongoose";

const postSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Please provide a title for this post."],
  },
  image: {
    type: String,
    required: [true, "Please provide an image for this post."],
  },
  message: {
    type: String,
    required: [true, "Please provide a message for this post."],
  },
  tags: [String],
  likes: {
    type: [Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  comments: [
    {
      creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      message: {
        type: String,
        required: [true, "Please provide a message for this comment."],
      },
      likes: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        default: [],
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
    },
  ],
});

const Post = models.Post || model("Post", postSchema);

export default Post;
