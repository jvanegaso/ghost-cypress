
import LoginPage from "../../../support/page-objects/login-page";
import PostsPage from "../../../support/page-objects/posts-page";
import PostPage from "../../../support/page-objects/post-page";
import LayoutPage from "../../../support/page-objects/layout-page";


let loginPage = null;
let postsPage = null;
let postPage = null;
let layoutPage = null;
describe('Gestion de post', () => {
  ['3.3.0', '3.42.5'].forEach((version) => {

    before('Setup', () => {
      loginPage = new LoginPage();
      postsPage = new PostsPage();
      postPage = new PostPage();
      layoutPage = new LayoutPage();
    //  
    });
  
    context('Deberia publicar el post de manera correcta', () => { 
      it(`Crear el post con el titulo  __v${version}`, () => {
      
      cy.login(null, null,version, true);  
      // Given a title and description 
      const titlePost  = 'Welcome to Test Ghost';
      const descriptiont = 'Horrible Ghost is now creating a post';
        
      // When a user try to create a post 
      cy.createPost(titlePost,descriptiont,version);
      cy.stepScreenshot('f3-s31-st311', version);
        
      // Then the application display a message that the post was published.
      layoutPage.getNotificationWrapper()
        .contains('Published!')
         .should('be.visible');
      cy.stepScreenshot('f3-s31-st312', version);
      
      // Make logout
      cy.logout();
      cy.wait(2000);
      cy.stepScreenshot('f3-s31-st313', version);
      });
  
  
    });
  });
});
