class PostPage {
    constructor() {
        this.titleImput = 'input[placeholder="Post Title"]';
        this.txtDescription = 'input[name="password"]';
    }

    getTitleInput() {
        return cy.get('textarea.gh-editor-title');  
        //return cy.get('.gh-koenig-editor-pane textarea');
    }

    getDescriptionImput() {
        return cy.get('div.koenig-editor__editor.__mobiledoc-editor.__has-no-content');
    }

    getPublishButtomMenu(){
        return cy.get('div.gh-publishmenu-trigger');
    }

    getPublishButtom(){
        return cy.get('div.gh-publishmenu-button');
    }

    getMsg(){

    }
}

export default PostPage;