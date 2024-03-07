import data from '../../fixtures/example.json'
import leaveComment from '../../support/pageObject/blogPage';

const blogPage = new leaveComment();

describe('Verify the post comment on the bolg page', ()=>{
    it('Should add a New Comment', ()=>{
        cy.visit(data.URL) // visit the URL
        blogPage.clickOnBlogText();
        blogPage.clickOnReadMoreText();
        blogPage.userComment();
        blogPage.authorName();
        blogPage.authorEmail();
        blogPage.authorWebsite();
        blogPage.postComment();
    });

    it('Should validate the required field', ()=>{
        cy.visit(data.URL) // visit the URL
        blogPage.clickOnBlogText();
        blogPage.clickOnReadMoreText();
        blogPage.userComment();
        blogPage.ClickOnPostCommentWithoutRequiredField();
        //blogPage.authorName();
        //blogPage.ClickOnPostCommentWithoutRequiredField();
        blogPage.authorEmail();
        blogPage.ClickOnPostCommentWithoutRequiredField();
    });

    it('Should validate the duplicate content post', ()=>{
        cy.visit(data.URL) // visit the URL
        blogPage.clickOnBlogText();
        blogPage.clickOnReadMoreText();
        blogPage.sameContent();
        blogPage.authorName();
        blogPage.authorEmail();
        blogPage.authorWebsite();
        blogPage.duplicateErrorMessage();
    });
});