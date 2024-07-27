const { Schema, models, model } = require("mongoose");

const BlogSchema = new Schema(
  {
    title: { type: String },
    subTitle: { type: String },
    slug: { type: String, required: true },
    description: { type: String },
    blogCategory: [{ type: String }],
    tags: [{ type: String }],
    status: { type: String },
  },
  { timestamps: true } // this option will automatically manage create data and update data fields
);

export const Blog = models.Blog || model("Blog", BlogSchema, "blogtest");