const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const middleware = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
	const blogs = await Blog.find({}).populate("user", {
		username: 1,
		name: 1,
	});
	response.json(blogs);
});

blogsRouter.post("/", middleware.userExtractor, async (request, response) => {
	const body = request.body;

	const user = await User.findById(request.userid);

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

	response.status(201).json(savedBlog);
});

blogsRouter.delete(
	"/:id",
	middleware.userExtractor,
	async (request, response) => {
		const blog = await Blog.findById(request.params.id);

		if (!blog) {
			return response.status(401).json({ error: "blog does not exist" });
		}

		if (request.userid !== blog.user.toString()) {
			return response
				.status(401)
				.json({ error: "user is not blog creator" });
		}

		await Blog.findByIdAndDelete(request.params.id);
		response.status(204).end();
	}
);

blogsRouter.put("/:id", async (request, response) => {
	const body = request.body;

	const blog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
	};

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
		new: true,
	});
	response.json(updatedBlog);
});

module.exports = blogsRouter;