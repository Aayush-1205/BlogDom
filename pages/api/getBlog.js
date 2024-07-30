import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {
  const { method, query } = req;

  await mongooseconnect();

  if (method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  try {
    let blogs;

    if (query.id) {
      blogs = await Blog.findById(query.id);
    } else if (query.blogCategory) {
      blogs = await Blog.find({ blogCategory: query.blogCategory });
    } else if (query.tags) {
      blogs = await Blog.find({ tags: query.tags });
    } else if (query.slug) {
      blogs = await Blog.find({ slug: query.slug });
    } else {
      blogs = await Blog.find();
    }

    if (!blogs) {
      return res.status(404).json({ message: "No blogs found." });
    }

    if (Array.isArray(blogs)) {
      blogs = blogs.reverse();
    }

    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error." });
  }
}
