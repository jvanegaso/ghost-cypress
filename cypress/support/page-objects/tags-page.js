class TagPage {
    constructor() {
        this.newTagButton = '.view-actions a[href="#/tags/new/"]' 
        this.tagName = 'input#tag-name';
        this.buttonSave = 'gh-btn.gh-btn-blue.gh-btn-icon.ember-view';
    }

    getNewTagButton(){
        return cy.get(this.newTagButton);
    }
    
    getNameLable(){
        return cy.get(this.tagName);
    }

    getButtonSaveTag(){
        return cy.get(this.buttonSave);
    }
  }
  
  export default TagPage;