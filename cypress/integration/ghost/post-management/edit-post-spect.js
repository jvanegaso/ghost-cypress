
import LoginPage from "../../../support/page-objects/login-page";
import PostsPage from "../../../support/page-objects/posts-page";
import PostPage from "../../../support/page-objects/post-page";
import LayoutPage from "../../../support/page-objects/layout-page";


let loginPage = null;
let postsPage = null;
let postPage = null;
let layoutPage = null;

describe('Edición de post', () => {

    before('Setup', () => {
       loginPage = new LoginPage();
       postsPage = new PostsPage();
       postPage = new PostPage();
       layoutPage = new LayoutPage();
       cy.login(null,null,true);
    });
  
    it('Deberia publicar el post de manera correcta .', () => {
      // Given a title and description 
       const titlePostToEdit  = 'Welcome to Ghost';
       const textToAddPostToEdit = 'Welcome to Horrible Ghost';
  
       // When a user try to create a post 
       cy.editPost(titlePostToEdit,textToAddPostToEdit)
  
      // Then the application display a message that the post was published.
      layoutPage.getNotificationWrapper()
        .contains('Updated.')
         .should('be.visible');
    });

  });