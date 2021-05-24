// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

import loginPage from "./page-objects/login-page";
import LayoutPage from "./page-objects/layout-page";
import PostsPage from "./page-objects/posts-page";
import PostPage from "./page-objects/post-page";
import TagPage from "./page-objects/tags-page";
import publishPage from "./page-objects/publish-page";
import generalPage from "./page-objects/general-page";

// -- This is a parent command --
Cypress.Commands.add('login', (email, password, version, useConfig = false) => {
  cy.fixture('config').then(config => {
    const { urls, usuario, clave } = config;
    cy.visit(`${urls[version]}#/signin`);
    if (!useConfig) {
      email && loginPage.getUserInput().type(email);
      password && loginPage.getPasswordInput().type(password);
    } else {
      loginPage.getUserInput().type(usuario);
      loginPage.getPasswordInput().type(clave);
    }

    loginPage.getLoginButton().click();
  });
});

Cypress.Commands.add('logout', (version) => {
  cy.fixture('config').then(config => {
   // debugger;
    const { urls } = config;
    cy.clearCookies({ domain: null }).then(() => {
      cy.reload();
      // cy.visit(`${urls[version]}#/signin`);
    });
  });
});

Cypress.Commands.add('goToProfilePage', () => {
  const layoutPage = new LayoutPage();
  layoutPage.getProfileButton().click();
  cy.wait(1000);
  layoutPage.getYourProfileLink().click();
});

Cypress.Commands.add('goToPagesPage', () => {
  publishPage.getPageMenu().click();
  cy.wait(1000);
});

Cypress.Commands.add('goToGeneralPage', () => {
  generalPage.getPageMenu().click();
  cy.wait(1000);
});

Cypress.Commands.add('goToTagPage', (version) => {
  cy.fixture('config').then(config => {
    const { urls } = config;
    cy.wait(1000);
    cy.visit(`${urls[version]}#/tags/new` );
  });
});

Cypress.Commands.add('goToPostPage', (version) => {
  cy.fixture('config').then(config => {
    const { urls } = config;
    cy.wait(1000);
    cy.visit(`${urls[version]}#/posts` );
    cy.wait(1000);
    cy.get('.view-actions a[href="#/editor/post/"]').click();
    cy.wait(1000);
    //cy.intercept('POST', `${urls[version]}api/v3/admin/posts/`).as('postIterceptor');
    //cy.wait(1000);
  });
});

// Util
Cypress.Commands.add('shouldHaveTrimmedText',
  { prevSubject: true },
  (subject, equalTo) => {
    if (isNaN(equalTo)) {
      console.log(subject.text());
      expect(subject.text().trim()).to.eq(equalTo);
    } else {
      expect(parseInt(subject.text())).to.eq(equalTo);
    }
    return subject;
  },
);

Cypress.Commands.add('stepScreenshot', (stepKey, version) => {
  const newImgName = `${version}/${stepKey}__v${version}`;
  cy.screenshot(newImgName);
});

Cypress.Commands.add('createPost', (titlePost, descriptionPost) => {

  const postsPage = new PostsPage();
  const postPage = new PostPage();
  //   cy.wait(2100);
  //  

  cy.fixture('config').then(config => {
    const { ghostBaseUrl } = config;
    cy.login(null, null, true);
    cy.visit(`${ghostBaseUrl}#/posts`);
    cy.wait(100);
    postsPage.getNewPostButton().click();
    cy.wait(100);

    //Intercept the post request: 
    cy.intercept('POST', `${ghostBaseUrl}api/v3/admin/posts/`).as('postIterceptor');

    //get the title element
    cy.get('.gh-koenig-editor-pane textarea').click().type(titlePost).blur();
    cy.wait('@postIterceptor').then((interceptor) => {
      const resposeBody = interceptor.response.body;
      if (resposeBody && Array.isArray(resposeBody.posts)) {
        const { id = null } = resposeBody.posts[0];
        if (id) {
          expect(cy.url().should('include', `editor/post/${id}`));
          cy.wait(2000);
          cy.visit(`${ghostBaseUrl}#/editor/post/${id}`);
          cy.wait(2000);
          cy.get('.gh-publishmenu .gh-publishmenu-trigger')
            .click();
          cy.wait(500);
          const publishBtn = cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
          publishBtn.click();
          cy.wait(1500);
        }
      }
    });
  });
});


Cypress.Commands.add('createPost', (titlePost, descriptionPost, version) => {

  const postsPage = new PostsPage();
  const postPage = new PostPage();

  cy.fixture('config').then(config => {
    const { urls } = config;
  //  cy.login(null, null, version, true);
    cy.get('.gh-nav-list.gh-nav-manage a[href="#/posts/"]').click();
    cy.wait(1000);
    cy.get('.view-actions a[href="#/editor/post/"]').click();
    cy.wait(1000);


    //Intercept the post request: 
    cy.intercept('POST', `${urls[version]}api/v3/admin/posts/`).as('postIterceptor');

    //get the title element
    cy.get('.gh-koenig-editor-pane textarea').click().type(titlePost).blur();
    cy.wait('@postIterceptor').then((interceptor) => {
      const resposeBody = interceptor.response.body;
      if (resposeBody && Array.isArray(resposeBody.posts)) {
        const { id = null } = resposeBody.posts[0];
        if (id) {
          expect(cy.url().should('include', `editor/post/${id}`));
          cy.wait(2000);
          cy.visit(`${urls[version]}#/editor/post/${id}`);
          cy.wait(2000);
          cy.get('.gh-publishmenu .gh-publishmenu-trigger')
            .click();
          cy.wait(500);
          const publishBtn = cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
          publishBtn.click();
          cy.wait(1500);
        }
      }
    });
  });
});


Cypress.Commands.add('editPost', (titlePostToEdit, textToAddPostToEdit) => {
  cy.fixture('config').then(config => {
    const { ghostBaseUrl } = config;
    cy.visit(`${ghostBaseUrl}#/posts`);

    //const postsPage = new PostsPage();
    cy.wait(5000);

    cy.get('.permalink.gh-list-data.gh-post-list-title.ember-view').then($titles => {
      const firstMatch = $titles.filter((i, t) => {
        return t.innerText.indexOf(titlePostToEdit) > -1;
      });
      if (firstMatch.length > 0) {
        cy.wrap(firstMatch[0]).click({ force: true });
      }
    });
    cy.wait(2560);

    cy.get('.gh-koenig-editor-pane textarea').click().type(textToAddPostToEdit).blur();

    cy.wait('@postIterceptor').then((interceptor) => {
      const resposeBody = interceptor.response.body;
      if (resposeBody && Array.isArray(resposeBody.posts)) {
        const { id = null } = resposeBody.posts[0];
        if (id) {
          expect(cy.url().should('include', `editor/post/${id}`));
          cy.wait(2000);
          cy.visit(`${ghostBaseUrl}#/editor/post/${id}`);
          cy.wait(2000);
          cy.get('.gh-publishmenu .gh-publishmenu-trigger')
            .click();
          cy.wait(500);
          const publishBtn = cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
          publishBtn.click();
          cy.wait(1500);
        }
      }
    });
  });
});

Cypress.Commands.add('deletePost', (titlePost) => {
  cy.fixture('config').then(config => {
    const { ghostBaseUrl } = config;
    cy.visit(`${ghostBaseUrl}#/posts`);

    //const postsPage = new PostsPage();
    cy.wait(1000);

    cy.get('.permalink.gh-list-data.gh-post-list-title.ember-view').then($titles => {
      const firstMatch = $titles.filter((i, t) => {
        return t.innerText.indexOf(titlePost) > -1;
      });
      if (firstMatch.length > 0) {
        cy.wrap(firstMatch[0]).click({ force: true });
      }
    });
    // cy.get('a.permalink.gh-list-data.gh-post-list-title.ember-view').select(titlePost).should('have.value', titlePost).click();
    cy.wait(2000);

    cy.get('button.post-settings').click();
    cy.wait(1000);

    cy.get('button.gh-btn.gh-btn-hover-red.gh-btn-icon.settings-menu-delete-button').click({ force: true });
    cy.wait(100);

    cy.get('.fullscreen-modal .gh-btn.gh-btn-red').click();
  });
});

Cypress.Commands.add('createTag', (titleTag, descriptionTag , version) => {
  cy.fixture('config').then(config => {
    const { urls } = config;
    cy.visit(`${urls[version]}`);
    const tagPage = new TagPage();
    cy.get('a[href="#/tags/"]').click();
    cy.wait(2000);
    tagPage.getNewTagButton().click();
    cy.get('#tag-name').click({force: true}).type(titleTag);
    cy.wait(2000);
    cy.get('#tag-description').click({force: true}).type(descriptionTag);
    cy.wait(2000);    
    cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click();
    cy.wait(2000);
  });
});


//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })