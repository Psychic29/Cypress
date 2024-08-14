import body from "../fixtures/credential.json";

describe("test the edit profile functionality for Client Admin", () => {
  beforeEach(() => {
    cy.login(body.email, body.password);
  });

  beforeEach(() => {
    cy.get(".typography__Headline-sc-9cefe69d-0").should(
      "have.text",
      "Select School"
    );
    cy.get(".css-6j8wv5-Input").click();
    cy.get(".CustomSelectAndSearch__SearchBar-sc-6389b65d-2").type("imagin", {
      delay: 300,
    });
    cy.wait(2000);
    cy.get(
      ".CustomSelectAndSearch__MenuContainer-sc-6389b65d-3 > :nth-child(1)"
    ).click();
    cy.wait(3000);
    cy.get(
      '.Header__Box1-sc-6875c8cf-4 > [data-test="buttonCta"] > .typography__Text-sc-9cefe69d-7'
    )
      .contains("On Behalf Login")
      .click();
    cy.get(":nth-child(1) > .RadioTile__Radio-sc-b56f2906-2").click();
    cy.get(".jTaRfJ").contains("Login").click();
    cy.wait(1000);
    cy.get(".SideBar__PageLinksContainer-sc-1e164ae7-11").realHover();
    cy.wait(2000);

    cy.get("#au_SIS").click();
    cy.get("#admin\\/user\\/list").click();
    cy.wait(3000);
    cy.get("body").realMouseMove(0, 0);
    cy.get(".dUYFec").click();
    cy.get(
      "#resizeMe > :nth-child(2) > :nth-child(1) > .typography__Text-sc-9cefe69d-7"
    ).click();
    cy.wait(2000);
    cy.get(".fazQTA").contains("Edit Profile").click();
  });

  it("check if the dropdown has some values", () => {
    cy.get(".css-q0ngnb-control").click();
    cy.wait(3000);
    cy.get('[data-test="dropDown"]').should("have.length", 1);
    cy.get(
      ':nth-child(2) > .CustomDropDownMenu__OptionContainer-sc-9b2b5f5c-24 > [data-test="checkBoxWithLabel"] > .CustomDropDownMenu__OptionText-sc-9b2b5f5c-6'
    ).click();
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.get(".userModel__UserModalContainer-sc-544888b-1").should("be.visible");
    cy.wait(3000);
    cy.get(
      '.userModel__UserModalContainer-sc-544888b-1 > [data-test="buttonCta"]'
    ).click();
  });

  it("Check for Invalid Name", () => {
    cy.get(
      ':nth-child(7) > .InputTextField__InputArea-sc-89c683be-2 > [data-test="inputArea"]'
    ).type("``#");
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.get(
      "#au_fee_led_stdnt_name_error > .typography__Subtitle2-sc-9cefe69d-9"
    ).should("have.text", "Invalid name ,");

    cy.wait(2000);
    cy.get(
      '.ErrorModal__OkayButton-sc-c430860d-3 > [data-test="buttonCta"]'
    ).click();
  });

  it("Check for Phone number 1 validity", () => {
    cy.get(
      "#\\31  > .CustomUpdateStudentProfile__TopBar-sc-c1fcd51a-3"
    ).click();
    cy.get(":nth-child(3) > .InputPhoneField__InputArea-sc-848737f6-1").type(
      "111111111"
    );
    cy.get(":nth-child(3) > .typography__HelperText-sc-9cefe69d-18").should(
      "have.text",
      "Enter valid Mobile Number"
    );
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.get("#au_fee_led_stdnt_name_error").should("be.visible");
    cy.get(
      '.ErrorModal__OkayButton-sc-c430860d-3 > [data-test="buttonCta"]'
    ).click();
  });

  it("Check for Phone number 2 validity", () => {
    cy.get(
      "#\\31  > .CustomUpdateStudentProfile__TopBar-sc-c1fcd51a-3"
    ).click();
    cy.get(":nth-child(3) > .InputPhoneField__InputArea-sc-848737f6-1").type(
      "9898989898"
    );
    cy.get(
      ":nth-child(5) > .InputPhoneField__InputArea-sc-848737f6-1 > .typography__InputTextAsInput-sc-9cefe69d-21"
    ).type("111111111");
    cy.get(":nth-child(5) > .typography__HelperText-sc-9cefe69d-18").should(
      "have.text",
      "Enter valid Mobile Number"
    );
    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.get("#au_fee_led_stdnt_name_error").should("be.visible");
    cy.get(
      '.ErrorModal__OkayButton-sc-c430860d-3 > [data-test="buttonCta"]'
    ).click();
  });

  it("Check siblings are added", () => {
    cy.get(
      '.CustomUpdateStudentProfile__SubTab-sc-c1fcd51a-6 > [data-test="buttonCta"]'
    ).click();
    cy.wait(2000);
    cy.get(".customSelectModal__MainContainer-sc-307978dd-0").should(
      "be.visible"
    );
    cy.get(
      ":nth-child(1) > .customSelectModal__CheckBoxComponent-sc-307978dd-2 > .CheckBox__CheckboxContainer-sc-5b6c4c48-0 > .CheckBox__Center-sc-5b6c4c48-1"
    ).click();
    cy.get(".daBReE").click();
    let Name;

    cy.url().then((url) => {
      const urlParams = new URLSearchParams(url.split("?")[1]);
      Name = urlParams.get("name");
    });

    cy.get(
      '.studentId-__SaveButtonContainer-sc-ee601bb2-8 > [data-test="buttonCta"]'
    ).click();
    cy.wait(3000);

    cy.get(".userModel__UserModalContainer-sc-544888b-1").should("be.visible");

    cy.wait(3000);

    cy.get(
      '.userModel__UserModalContainer-sc-544888b-1 > [data-test="buttonCta"]'
    ).click();

    cy.wait(3000);
    cy.get(
      ".list__InputFieldContainer-sc-52a6879-7 > .SearchInputTextField__InputContainer-sc-f5123b7d-3 > .SearchInputTextField__InputArea-sc-f5123b7d-1"
    ).then(($input) => {
      cy.wrap($input).type(Name || "", { delay: 400 });
    });

    cy.get(
      ".CustomTable__TR-sc-5bc5825-5 > :nth-child(1) > .typography__Text-sc-9cefe69d-7"
    )
      .first()
      .click();
    cy.get(
      ":nth-child(1) > .CustomShowStudentProfile__SubContainer-sc-f79b8183-3 > .CustomShowStudentProfile__TextContainer-sc-f79b8183-4 > .cinQKd > .CustomShowStudentProfile__TextValue-sc-f79b8183-8"
    ).should("not.be", "");
  });
});
