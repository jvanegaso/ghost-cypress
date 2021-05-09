class PostsPage {
    constructor() {
    }

    getNewPostButton() {
       return cy.get('.view-actions').contains('New post')
    }
}

export default PostsPage;