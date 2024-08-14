import body from "../fixtures/credential.json";

describe("test the edit profile functionality for super user", () => {
  beforeEach(() => {
    cy.login(body.email, body.password);
  });

  beforeEach(() => {
    cy.get(".typography__Headline-sc-9cefe69d-0").should(
      "have.text",
      "Select School"
    );
    cy.get(".css-6j8wv5-Input").click();
    cy.get(".CustomSelectAndSearch__SearchBar-sc-6389b65d-2").type("bheem1", {
      delay: 300,
    });
    cy.wait(2000);
    cy.get(
      ".CustomSelectAndSearch__MenuContainer-sc-6389b65d-3 > :nth-child(2)"
    ).click();
  });

  beforeEach(() => {
    cy.wait(1000);
    cy.get(".SideBar__PageLinksContainer-sc-1e164ae7-11").realHover();
    cy.wait(2000);
    cy.get("#au_admin").click();
    cy.get("#admin\\/adminSetup").click();
    cy.get("#au_fee_3").click();
    cy.get("body").realMouseMove(0, 0);
    cy.get(
      ".Header__Role-sc-6875c8cf-28 > .typography__Text-sc-9cefe69d-7"
    ).should("have.text", "Super User");

    cy.wait(2000);
  });

  it("Edit Profile not visible for Inactive user", () => {
    cy.get("#page-item-3").click();
    cy.get(":nth-child(19) > :nth-child(6) > div > p").should(
      "have.text",
      "Inactive"
    );
    cy.get(":nth-child(19) > :nth-child(1) > div > img").click();
    cy.get(
      ":nth-child(20) > :nth-child(1) > .users__TableContent-sc-75fe7415-18"
    ).click();
    cy.get(".fazQTA > .typography__Text-sc-9cefe69d-7").should("not.exist");
  });

  it("Edit the name and working fine", () => {
    // TEST CASES FOR STUDENT EDIT PROFILE - Working Fine
    cy.get("#page-item-5").click();
    cy.wait(2000);
    cy.get("#page-item-8").click();
    cy.get(":nth-child(2) > :nth-child(6) > div > p").should(
      "have.text",
      "Active"
    );
    cy.get(":nth-child(15) > :nth-child(1) > div > img").click();
    cy.get(":nth-child(16) > :nth-child(1)").click();
    cy.get(".fazQTA > .typography__Text-sc-9cefe69d-7")
      .should("have.text", "Edit Profile")
      .click();

    cy.get(":nth-child(3) > .InputTextField__InputArea-sc-89c683be-2").should(
      "have.attr",
      "disabled"
    );

    cy.get("#react-select-2-input").should("have.attr", "disabled");
    cy.get(":nth-child(4) > .typography__Text-sc-9cefe69d-7").contains("*");

    cy.get(
      ':nth-child(7) > .InputTextField__InputArea-sc-89c683be-2 > [data-test="inputArea"]'
    ).type(" New", { delay: 300 });
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.get(".userModel__UserModalContainer-sc-544888b-1").should("be.visible");
    cy.get(
      '.userModel__UserModalContainer-sc-544888b-1 > [data-test="buttonCta"]'
    ).click();
  });

  it("Give error on no class Found", () => {
    // When the user is active
    cy.get("#page-item-5").click();
    cy.wait(2000);
    cy.get("#page-item-8").click();
    cy.get(":nth-child(2) > :nth-child(6) > div > p").should(
      "have.text",
      "Active"
    );

    cy.get("tbody > :nth-child(2) > :nth-child(1) > div > img").click();
    cy.get(
      ":nth-child(3) > :nth-child(1) > .users__TableContent-sc-75fe7415-18"
    ).click();
    cy.get(".fazQTA > .typography__Text-sc-9cefe69d-7")
      .should("have.text", "Edit Profile")
      .click();
    cy.get("#react-select-2-input").should("have.attr", "disabled");
    cy.get("#react-select-2-input").should("have.value", "");
    cy.get(
      ':nth-child(11) > .InputTextField__InputArea-sc-89c683be-2 > [data-test="inputArea"]'
    ).type(" abc");
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.wait(2000);
    cy.get(
      "#au_fee_led_stdnt_name_error > .typography__Headline-sc-9cefe69d-0"
    ).should("exist");
    cy.wait(2000);
    cy.get(
      '.ErrorModal__OkayButton-sc-c430860d-3 > [data-test="buttonCta"]'
    ).click();
  });
});
