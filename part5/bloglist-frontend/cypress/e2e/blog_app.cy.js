describe("Blog app", function () {
	beforeEach(function () {
		cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);
		const user = {
			name: "Tester Number 1",
			username: "test",
			password: "test",
		};
		cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
		cy.visit("");
	});

	it("Login form is shown", function () {
		cy.contains("log in to application");
	});

	describe("Login", function () {
		it("succeeds with correct credentials", function () {
			cy.get("input#username").type("test");
			cy.get("input#password").type("test");
			cy.get("button#login-button").click();

			cy.contains("Logged in as Tester Number 1");
		});

		it("fails with wrong credentials", function () {
			cy.get("input#username").type("test");
			cy.get("input#password").type("wrong");
			cy.get("button#login-button").click();
			cy.contains("invalid username or password");
		});
	});

	describe("When logged in", function () {
		beforeEach(function () {
			cy.login({ username: "test", password: "test" });
		});

		it("A blog can be created", function () {
			cy.contains("new blog").click();
			cy.get("#title").type("new blog");
			cy.get("#author").type("number 1 tester");
			cy.get("#url").type("cypress.com");
			cy.contains("save").click();

			cy.contains("new blog number 1 tester");
		});

		it("user can logout", function () {
			cy.contains("logout").click();
			cy.contains("log in to application");
		});

		describe("when blogs exist", function () {
			beforeEach(function () {
				cy.createBlog({
					title: "First blog",
					author: "tester 1",
					url: "123.com",
				});
				cy.createBlog({
					title: "Second blog",
					author: "tester 1",
					url: "123.com",
				});
				cy.createBlog({
					title: "Third blog",
					author: "tester 1",
					url: "123.com",
				});
			});

			it("user can show details of a blog", function () {
				cy.contains("Third blog").contains("view").click();
			});

			it("user can like a blog", function () {
				cy.contains("Third blog").contains("view").click();
				cy.contains("like").click();
			});

			it("user can show details of a blog then hide the details", function () {
				cy.contains("Third blog").contains("view").click();
				cy.contains("hide").click();
			});

			it("blog can be deleted by creator", function () {
				cy.contains("Third blog").contains("view").click();
				cy.contains("delete");
			});

			it.only("blog can't be deleted by someone who is not the submitter", function () {
				const other = {
					name: "Other Tester",
					username: "other",
					password: "other",
				};
				cy.request("POST", `${Cypress.env("BACKEND")}/users`, other);

				cy.contains("logout").click();
				cy.login({
					username: other.username,
					password: other.password,
				});
				cy.contains("Third blog").contains("view").click();
				cy.contains("delete").should("not.exist");
			});
		});
	});
});
