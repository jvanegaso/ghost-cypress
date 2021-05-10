class PostsPage {
    constructor() {
    }

    getNewPostButton() {
       return cy.get('.view-actions a[href="#/editor/post/"]');
    }
}

export default PostsPage;