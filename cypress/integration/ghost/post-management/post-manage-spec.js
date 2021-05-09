
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
  });

  context('Publicar el post de manera correcta', () => {

    it('Crear el post con el titulo', () => {
      cy.login(null, null, true);
      cy.get('.gh-nav-list.gh-nav-manage a[href="#/posts/"]').click();
      cy.wait(1000);
      cy.get('.view-actions a[href="#/editor/post/"]').click();
      cy.wait(1000);

      cy.fixture('config').then(config => {
        const { ghostBaseUrl } = config;
        cy.intercept('POST', `${ghostBaseUrl}api/v3/admin/posts/`).as('postIterceptor');
        cy.get('.gh-koenig-editor-pane textarea')
          .click()
          .type('Titulo de post')
          .blur();
        cy.wait('@postIterceptor').then((interceptor) => {
          const resposeBody = interceptor.response.body;
          if (resposeBody && Array.isArray(resposeBody.posts)) {
            const { id = null } = resposeBody.posts[0];
            if (id) {
              expect(cy.url().should('include', `editor/post/${id}`));
              cy.wait(1000);
              cy.visit(`${ghostBaseUrl}#/editor/post/${id}`);
              cy.wait(1000);
              cy.get('.gh-publishmenu .gh-publishmenu-trigger')
                .click();
              cy.wait(500);
              const publishBtn = cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
              publishBtn.click();
              cy.wait(1500);
              layoutPage.getNotificationWrapper()
                .contains('Published! ')
                .should('be.visible');
            }
          }
        });
      });
    });

  });

  // it('Deberia publicar el post de manera correcta .', () => {
  //   // Given a title and description 
  //    const titlePost  = 'TestCypress1';
  //    const descriptionPost = 'PruebADecreacion1';

  //    // When a user try to create a post 
  //    cy.createPost(titlePost,descriptionPost)

  //   // Then the application display a message that the post was published.
  //   layoutPage.getNotificationWrapper()
  //     .contains('Published!')
  //      .should('be.visible');
  // });

});