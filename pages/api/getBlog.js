import { mongooseconnect } from "@/lib/mongoose";
import { Blog } from "@/models/blog";

export default async function handle(req, res) {
    const { method } = req;

    await mongooseconnect()

    // api
    if (method === 'GET') {
        if (req.query?.id) {
            // fetch a single blog by id
            const blog = await Blog.findById(req.query.id)
            res.json(blog)
        }else if (req.query?.blogCategory){
            // fetch blogs by blogCategory
            const cate = await Blog.find({blogCategory: req.query.blogCategory});
            res.json(cate.reverse())
        }else if(req.query?.tags){
            // fetch blogs by tags
            const tag = await Blog.find({tags: req.query.tags});
            res.json(tag.reverse())
        }else if(req.query?.slug){
            // fetch blogs by slug
            const url = await Blog.find({slug: req.query.slug});
            res.json(url.reverse())
        } else{
            // fetch all blogs
            const blogs = await Blog.find();
            res.json(blogs.reverse())
        }
    }else{
        res.status(405).json({message: 'Method not allowed.'})
    }
}