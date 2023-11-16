const supertest = require("supertest");
const mongoose = require("mongoose");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const promiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(promiseArray);
}, 100000);

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("all blogs are returned", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("unique identifier property is named 'id'", async () => {
	const response = await api.get("/api/blogs");
	const firstNote = response.body[0];
	expect(firstNote.id).toBeDefined();
});

test("a valid blog can be added", async () => {
	const newBlog = {
		title: "async/await simplifies making async calls",
		url: "test.com",
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const blogsAfter = await helper.blogsInDb();
	expect(blogsAfter).toHaveLength(helper.initialBlogs.length + 1);

	const titles = blogsAfter.map((b) => b.title);
	expect(titles).toContain("async/await simplifies making async calls");
});

test("number of likes defaults to 0", async () => {
	const newBlog = {
		title: "async/await simplifies making async calls",
		url: "test.com",
	};

	const response = await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const savedBlog = response.body;
	expect(savedBlog.likes).toEqual(0);
});

test("missing title or url", async () => {
	const missingTitle = {
		url: "test.com",
	};

	const missingURL = {
		title: "async/await simplifies making async calls",
	};

	const missingTitleAndURL = {};

	await api.post("/api/blogs").send(missingTitle).expect(400);
	await api.post("/api/blogs").send(missingURL).expect(400);
	await api.post("/api/blogs").send(missingTitleAndURL).expect(400);
});

afterAll(async () => {
	await mongoose.connection.close();
});
