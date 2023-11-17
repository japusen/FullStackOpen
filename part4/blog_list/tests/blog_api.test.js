const supertest = require("supertest");
const mongoose = require("mongoose");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");
const User = require("../models/user");

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
	const blogPromiseArray = blogObjects.map((blog) => blog.save());
	await Promise.all(blogPromiseArray);

	await User.deleteMany({});

	const userObjects = helper.initialUsers.map((user) => new User(user));
	const userPromiseArray = userObjects.map((user) => user.save());
	await Promise.all(userPromiseArray);
}, 100000);

describe("when there are initially some blogs saved", () => {
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
});

describe("addition of a new note", () => {
	test("succeeds with valid data", async () => {
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

	test("defaults to 0 likes if likes is missing", async () => {
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

	test("fails if title and/or url are missing", async () => {
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
});

describe("deletion of a blog", () => {
	test("succeeds with a valid id", async () => {
		const blogs = await helper.blogsInDb();
		const blogToDelete = blogs[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAfter = await helper.blogsInDb();
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length - 1);

		const titles = blogsAfter.map((b) => b.title);
		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("updating a blog", () => {
	test("by changing the number of likes", async () => {
		const blogs = await helper.blogsInDb();
		const updatedBlog = { ...blogs[0], likes: 999 };

		const response = await api
			.put(`/api/blogs/${updatedBlog.id}`)
			.send(updatedBlog);

		const returnedNote = response.body;
		expect(returnedNote.likes).toEqual(999);

		const blogsAfter = await helper.blogsInDb();
		expect(blogsAfter).toHaveLength(helper.initialBlogs.length);
	});
});

describe("creating a user", () => {
	test("succeeds with valid data", async () => {
		const newUser = {
			username: "test",
			name: "test",
			password: "test",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(helper.initialUsers.length + 1);

		const usernames = usersAfter.map((u) => u.username);
		expect(usernames).toContain("test");
	});

	test("fails if the username is not unique", async () => {
		const newUser = {
			username: "test",
			name: "test",
			password: "test",
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		await api.post("/api/users").send(newUser).expect(400);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(helper.initialUsers.length + 1);
	});

	test("fails if password is missing", async () => {
		const newUser = {
			username: "test",
			name: "test",
		};

		await api.post("/api/users").send(newUser).expect(401);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(helper.initialUsers.length);
	});

	test("fails if password is less than 3 characters", async () => {
		const newUser = {
			username: "test",
			name: "test",
			password: "1",
		};

		await api.post("/api/users").send(newUser).expect(401);

		const usersAfter = await helper.usersInDb();
		expect(usersAfter).toHaveLength(helper.initialUsers.length);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
