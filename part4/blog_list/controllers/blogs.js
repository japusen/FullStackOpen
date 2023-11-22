const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
	const body = request.body;

	const user = request.user;

	if (!user) {
		return response.status(401).json({ error: "operation not permitted" });
	}

	const newBlog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes || 0,
		user: user.id,
	});

	const savedBlog = await newBlog.save();

	user.blogs = user.blogs.concat(savedBlog._id);
	await user.save();

	savedBlog = await Blog.findById(savedBlog._id).populate("user");
	response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
	const blog = await Blog.findById(request.params.id);
	const user = request.user;

	if (!user || user.id.toString() !== blog.user.toString()) {
		return response.status(401).json({ error: "Unauthorized " });
	}

	user.blogs = user.blogs.filter((b) => b.toString() !== blog.id.toString());

	await user.save();
	await blog.remove();
	response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: body.user.id,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	updatedBlog = await Blog.findById(updatedBlog._id).populate("user");
	response.json(updatedBlog);
});

module.exports = blogsRouter;
