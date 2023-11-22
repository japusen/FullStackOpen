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
});
