const tagPageV2 = {

    getNewTagButton(){
        return cy.get('.view-actions a[href="#/tags/new/"]');
    },
    
    getNameInput(){
        return cy.get('input#tag-name');
    },  

    getColorInput(){
        return cy.get('input[name="accent-color"]');
    },  

    getSlugInput(){
        return cy.get('input#tag-slug"');
    },  

    getDescriptionInput(){
        return cy.get('textarea[id="tag-description"]');
    },  

    getButtonSave(){
        return cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon');
    },

    getMessageVerificationResponse(){
        return cy.get('input#tag-name + span.error');
        //return cy.get('.form-group.ember-view.mr2.flex-auto .error .response');
    }
   
  }
  
  export default tagPageV2;