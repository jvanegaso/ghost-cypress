import TagPage from "../../../support/page-objects/tags-page";
import LayoutPage from "../../../support/page-objects/layout-page";

let tagPage = null;
let layoutPage = null;


describe('Tags Management', () => {
  ['3.3.0', '3.42.5'].forEach((version) => {
    before('Setup', () => {
        tagPage = new TagPage();
        layoutPage = new LayoutPage();
    });
    
    it(`Should create a tag  __v${version}`, () => {
      cy.login(null, null, version, true);
      cy.wait(2000);
      // Given a tag name and description
      const tagName = 'Tag number' ;
      const descriptionTag = 'Tag description';
      const lowerTagName = tagName.toLowerCase();
      const newUrl = lowerTagName.replace(' ', '-');
      // When a user tries to create tag
      cy.createTag(tagName,descriptionTag, version);
      cy.wait(2000);
      cy.stepScreenshot('f4-s41-st411', version);
      // Then the application displays a tags page"
      cy.wait(1000);
      cy.url().should('include',newUrl);
      cy.wait(2000);
      cy.stepScreenshot('f4-s41-st412', version);
      //cy.logout();
      //cy.wait(2000);
    });
  
    // it('Should show an error You must specify a name for the tag', () => {
    //     // Given a wrong user and password
    //     const tagName = '' ;
    //     const descriptionTag = '';
    //     const lowerTagName = tagName.toLowerCase();
    //     const newUrl = lowerTagName.replace(' ', '-');
    //     // When a user tries to login
    //     cy.createTag(tagName,descriptionTag);
    //     // Then the application displays a tags page"
    //     layoutPage.getNotificationWrapper()
    //     .contains('You must specify a name for the tag');
    //   });
  
  });
});