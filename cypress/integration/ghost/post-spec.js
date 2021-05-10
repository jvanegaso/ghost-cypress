
import LoginPage from "../../support/page-objects/login-page";
import PostPage from "../../support/page-objects/posts-page";

let loginPage = null;
let postPage = null;

describe('Gestion de post', () => {

    before('Setup', () => {
      loginPage = new LoginPage();
      cy.login(null,null,true);
      postPage = new PostPage();

    });
  
    it('Deberia publicar el post de manera correcta .', () => {
      // Given 
      const titlePost  = 'TestCypress1';
      const descriptionPost = 'Prueba de creación de post cypress 1 ';
  
      // When
      cy.createPost(titlePost,descriptionPost)
  
      // Then
      //postPage.getMsg()
       // .should('have.text', 'Published! View Post');
    });

  });