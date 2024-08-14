import url from "../fixtures/url.env.json";

Cypress.Commands.add("login", (email, password) => {
  cy.visit(url["local"], {
    onBeforeLoad(win) {
      cy.stub(win, "open").callsFake((url) => {
        return win.open.wrappedMethod.call(win, url, "_self");
      });
    },
  });

  cy.get("#Home_inpass").contains("Login with Password").click();
  cy.get("#Home_email").type(email);
  cy.get("#Home_entpwd").type(password);
  cy.get("#Home_login").click();
});
