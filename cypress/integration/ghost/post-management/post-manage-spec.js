
import PostsPage from "../../../support/page-objects/posts-page";
import PostPage from "../../../support/page-objects/post-page";
import LayoutPage from "../../../support/page-objects/layout-page";


let postsPage = null;
let postPage = null;
let layoutPage = null;
describe('Gestion de post', () => {
  ['3.3.0', '3.42.5'].forEach((version) => {

    before('Setup', () => {
      postsPage = new PostsPage();
      postPage = new PostPage();
      layoutPage = new LayoutPage();
      //  
    });

    it(`Deberia Crear el post con el titulo  __v${version}`, () => {

      cy.login(null, null, version, true);
      cy.wait(2000);
      // Given a title and description 
      const titlePost = 'Welcome to Test Ghost';
      const descriptiont = 'Horrible Ghost is now creating a post';

      // When a user try to create a post 
      cy.createPost(titlePost, descriptiont, version);
      cy.wait(3000);
      cy.stepScreenshot('f3-s31-st311', version);

      // Then the application display a message that the post was published.
      layoutPage.getStatusHeader()
        .contains('Published')
        .should('be.visible');
      cy.wait(2000);
      cy.stepScreenshot('f3-s31-st312', version);

      // // Make logout
      // cy.logout();
      // cy.wait(2000);
      // cy.stepScreenshot('f3-s31-st313', version);
    });
  });
});
