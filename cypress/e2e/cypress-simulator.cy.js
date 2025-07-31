describe("Cypress Simulator", () => {

    beforeEach(() => {

        cy.visit("./src/index.html?skipCaptcha=true", {
            onBeforeLoad(win){
                win.localStorage.setItem("cookieConsent", "accepted")
            }
        })

        cy.contains("button", "Login").click()

    })

   

    it("it shows an error when entering and running a valid Cypress command without parentheses (e.g., cy.visit)", () => {

        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.visit")
        cy.contains("button", "Run").click()

        cy.get('#outputArea', {timeout: 6000 })
            .should("contain", "Error:")
            .and("contain", "Missing parentheses on `cy.visit` command")
            .and("be.visible")
    })



    it("checks the run button disabled and enabled states", () => {
        cy.contains("button", "Run").should("be.disabled")
        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.log('Iaii')")
        cy.contains("button", "Run").should("be.enabled")
        cy.get("textarea[placeholder='Write your Cypress code here...']").clear()
        cy.contains("button", "Run").should("be.disabled")
    })

    it("clears the code input when logging off then logging in again", () => {
        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.log('Iaii')")

        cy.get('#sandwich-menu').click()
        cy.contains("button", "Logout").click()
        cy.contains("button", "Login").click()
            .should("have.value", "")

    })

    it("disables the run button when logging off then logging in again", () => {
        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.log('Iaii')")

        cy.get('#sandwich-menu').click()
        cy.contains("button", "Logout").click()
        cy.contains("button", "Login").click()

        cy.contains("button", "Run").should("be.disabled")
    })

    it("clears the code output when logging off then logging in again", () => {
        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.log('Iaii')")
        cy.contains("button", "Run").click()

        cy.get("#outputArea", { timeout: 6000 })
            .should("contain", "Success:")
            .and("contain", "cy.log('Iaii') // Logged message 'Iaii'")
            .and("be.visible")
        

        cy.get('#sandwich-menu').click()
        cy.contains("button", "Logout").click()
        cy.contains("button", "Login").click()

      
        cy.get("#outputArea", { timeout: 6000 }).should("not.contain", "cy.log('Yay!')")

    })

    it("doesn't show the cookie consent banner on the login page", () => {
        cy.clearAllLocalStorage()

        cy.reload()

        cy.contains("button", "Login").should("be.visible")
        cy.get("#cookieConsent").should("not.be.visible")
    })

})

describe("Cypress simulator - cookies consent", () => {
    beforeEach(() => {
        cy.visit("./src/index.html?skipCaptcha=true")
        cy.contains("button", "Login").click()
    })

    it("consents on the cookies usage", () => {
        cy.get("#cookieConsent")
            .as("cookieConsentBanner")
            .find("button:contains('Accept')")
            .click()

        cy.get("@cookieConsentBanner").should("not.be.visible")
        cy.window()
            .its("localStorage.cookieConsent")
            .should("be.equal", "accepted")
    })

    it("declines on the cookies usage", () => {
        cy.get("#cookieConsent")
            .as("cookieConsentBanner")
            .find("button:contains('Decline')")
            .click()

        cy.get("@cookieConsentBanner").should("not.be.visible")
        cy.window()
            .its("localStorage.cookieConsent")
            .should("be.equal", "declined")

    })
})

