import mongoose from "mongoose";
const schema = mongoose.Schema;

var imageSchema = new schema({
  name: String,
  desc: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

//Image is a model which has a schema imageSchema

export const Image = mongoose.model("Image", imageSchema);
