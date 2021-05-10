
import LoginPage from "../../../support/page-objects/login-page";
import PostsPage from "../../../support/page-objects/posts-page";
import PostPage from "../../../support/page-objects/post-page";
import LayoutPage from "../../../support/page-objects/layout-page";


let loginPage = null;
let postsPage = null;
let postPage = null;
let layoutPage = null;
describe('Gestion de post', () => {

  before('Setup', () => {
    loginPage = new LoginPage();
    postsPage = new PostsPage();
    postPage = new PostPage();
    layoutPage = new LayoutPage();
    //cy.login(null, null, true);
  });

  context('Deberia mostrar error por titulo errado', () => { 
    it('Crear el post con el titulo', () => {
    
      // Given a title and description 
      const titlePost  = '';
      const descriptiont = '';
  
      // When a user try to create a post 
      cy.createPost(titlePost,descriptiont);
        
      // Then the application display a message that the post was published.
      layoutPage.getNotificationWrapper()
        .contains('Error!')
         .should('be.visible');
      });
    });

  context('Deberia publicar el post de manera correcta', () => { 
    it('Crear el post con el titulo', () => {
    
    // Given a title and description 
    const titlePost  = 'Welcome to Test Ghost';
    const descriptiont = 'Horrible Ghost is now creating a post';

    // When a user try to create a post 
    cy.createPost(titlePost,descriptiont);
      
    // Then the application display a message that the post was published.
    layoutPage.getNotificationWrapper()
      .contains('Published!')
       .should('be.visible');
    });
  });


  context('Deberia mostrar un error porque se crean dos post con el mismo titulo ', () => { 
    it('Crear el post con el titulo', () => {
    
    // Given a title and description 
    const titlePost  = 'Welcome to Test Ghost';
    const descriptiont = 'Horrible Ghost is now creating a post';

    // When a user try to create a post 
    cy.createPost(titlePost,descriptiont);
    //cy.createPost(titlePost,descriptiont);
      
    // Then the application display a message that the post was published.
    layoutPage.getNotificationWrapper()
      .contains('Error')
       .should('be.visible');
    });
  });

});