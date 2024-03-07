///<reference types = "Cypress" />
import data from '../../fixtures/example.json'
import {random_string,} from '../../fixtures/randomText'

const comment = data.message;
const randomText = random_string(20);

class leaveComment {
    clickOnBlogText(){
        cy.get('[rel="category tag"]').click(); //Click on the Blog text hyperlink
        cy.url().should('include', 'index.php/category/blog/') // Verify the user on the right page
    }
    clickOnReadMoreText(){
        cy.get('.read-more').click(); // Click on the "Read More" hypertext
        cy.get('#respond').scrollIntoView() // Scroll down till "Leave a comment"
    }

    ClickOnPostCommentWithoutRequiredField(){
        cy.get('#submit').click();
        cy.get('.wp-die-message > p').should('have.text', 'Error: Please fill the required fields.')
        cy.get('a').click();
    }

    userComment(){
        cy.get('#comment').clear().type(randomText).should('have.attr', 'required')
    }

    sameContent(){
        cy.get('#comment').clear().type(comment).should('have.attr', 'required')
    }

    authorName(){
        cy.get('#author').clear().type(data.name).should('have.attr', 'required')
    }

    authorEmail(){
        cy.get('#email').clear().type(data.email)

        // Check if the email format is valid
        cy.get('#email').then($input => {
            
            const enteredEmail = $input.val() // Get the entered email address from the input field
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/  // Define a regular expression for email format validation
            expect(emailRegex.test(enteredEmail)).to.be.true // Check if the entered email matches the email format
        })
    }

    authorWebsite(){
        cy.get('#url').clear().type('https://techinsightsblog.com/')

        cy.get('#url').then($input => {
            const enteredWebUrl = $input.val()
            // Define your expected URL format using a regular expression
            const expectedUrlFormat = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,})(\/\S*)?$/;
      
            // Assert that the actual URL matches the expected format
            expect(expectedUrlFormat.test(enteredWebUrl)).to.be.true;
        });
    }

    postComment(){
        cy.get('#submit').click();
        cy.get('.comment-content>p').invoke('text').then(commentMassage =>{
            expect(commentMassage).to.equals(randomText)
        })
    }

    duplicateErrorMessage(){
        cy.get('#submit').click();
        cy.get('.wp-die-message>p').should('have.text', 'Duplicate comment detected; it looks as though you’ve already said that!')

    }

}

export default leaveComment