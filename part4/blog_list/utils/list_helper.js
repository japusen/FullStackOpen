const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	const summation = (sum, blog) => {
		return sum + blog.likes;
	};

	return blogs.length === 0 ? 0 : blogs.reduce(summation, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikes = (max, blog) => {
		return max.likes > blog.likes ? max : blog;
	};

	return blogs.length === 0 ? undefined : blogs.reduce(mostLikes);
};

const mostBlogs = (blogs) => {
	const findAuthorWithMostBlogs = (data, blog) => {
		const map = data[0];
		const authorWithMost = data[1];

		const author = blog.author;

		if (map.has(author)) {
			map.set(author, map.get(author) + 1);
		} else {
			map.set(author, 1);
		}

		const updatedNumOfProp = map.get(author);
		if (updatedNumOfProp > authorWithMost.blogs) {
			authorWithMost.author = author;
			authorWithMost.blogs = updatedNumOfProp;
		}

		return data;
	};

	if (blogs.length === 0) return undefined;

	return blogs.reduce(findAuthorWithMostBlogs, [
		new Map(),
		{
			author: "",
			blogs: 0,
		},
	])[1];
};

const mostLikes = (blogs) => {
	const findAuthorWithMostLikes = (data, blog) => {
		const map = data[0];
		const authorWithMost = data[1];

		const author = blog.author;

		if (map.has(author)) {
			map.set(author, map.get(author) + blog.likes);
		} else {
			map.set(author, blog.likes);
		}

		const updatedNumOfProp = map.get(author);
		if (updatedNumOfProp > authorWithMost.likes) {
			authorWithMost.author = author;
			authorWithMost.likes = updatedNumOfProp;
		}

		return data;
	};

	if (blogs.length === 0) return undefined;

	return blogs.reduce(findAuthorWithMostLikes, [
		new Map(),
		{
			author: "",
			likes: 0,
		},
	])[1];
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes,
};
