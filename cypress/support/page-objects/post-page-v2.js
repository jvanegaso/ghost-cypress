const postPageV2 = {
    
    getTitleInput(){
        return cy.get('.gh-koenig-editor-pane textarea');
    },

    getDescriptionInput(){
        return cy.get('.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
    },

    getPublishMenu(){
        return cy.get('.gh-publishmenu .gh-publishmenu-trigger');
    },

    getPublishButton(){
        return cy.get('.gh-publishmenu-dropdown .gh-publishmenu-footer .gh-publishmenu-button');
    },

    getNewPostButton() {
        return cy.get('.view-actions a[href="#/editor/post/"]');
    },
    getStatusHeader() {
        return cy.get('.gh-notification-content + span.gh-notification-title');
      }
   
  }
  
  export default postPageV2;