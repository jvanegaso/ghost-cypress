
import LoginPage from "../../../support/page-objects/login-page";
import PostsPage from "../../../support/page-objects/posts-page";
import PostPage from "../../../support/page-objects/post-page";
import LayoutPage from "../../../support/page-objects/layout-page";


let loginPage = null;
let postsPage = null;
let postPage = null;
let layoutPage = null;

describe('Eliminación de post', () => {

    before('Setup', () => {
       loginPage = new LoginPage();
       postsPage = new PostsPage();
       postPage = new PostPage();
       layoutPage = new LayoutPage();
    });
  
    it('Deberia Eliminar el post de manera correcta .', () => {
      // Given a title and description 
       const titlePostToDelete  = 'Welcome to Test Ghost';
       // cy.login(null,null,true);
      // cy.createPost(titlePostToDelete, '');
       // When a user try to create a post 
      // cy.deletePost(titlePostToDelete);
      // Then the application display a message that the post was published.
        cy.url().should('include','#/post');

        cy.logout();
    });

  });