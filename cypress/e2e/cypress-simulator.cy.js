describe("Cypress Simulator", () => {

    beforeEach(() => {

        cy.visit("./src/index.html?skipCaptcha=true", {
            onBeforeLoad(win){
                win.localStorage.setItem("cookieConsent", "accepted")
            }
        })

        cy.contains("button", "Login").click()

    })

    //planejando casos de teste
    it.only("successfully simulates a Cypress command (e.g., cy.log('Yay!'))", () => {
        cy.get("textarea[placeholder='Write your Cypress code here...']")
            .type("cy.log('Yay!')")
        cy.contains("button", "Run").click()


        //alterando default para esperar por ate 6 segundos
        cy.get('#outputArea', {timeout: 6000 })
            .should("contain", "Success:")
            .and("contain", "cy.log('Yay!') // Logged message 'Yay!'")
            
            //sempre tenho que verificar se o texto em questao esta visivel
            .and("be.visible")

    })

    it("error: invalid cypress command", () => {

    })

    it("warning", () => {

    })

    it("error: valid command without parentheses", () => {

    })

    it("help", () => {

    })

    it("maximize/minimize", () => {

    })

    it("logout", () => {

    })

    it("show and hide logout button", () => {

    })

    it("Running.. state", () => {

    })

    it("Accept cookies", () => {

    })

    it("Decline cookies", () => {

    })

    it("Captcha button states", () => {

    })

    it("Captcha error", () => {

    })

    it("Run button - enabled/disabled states", () => {

    })

    it("Reset textarea on logout and login", () => {

    })

    it("Disable run button on logout and login", () => {

    })

    it("Reset output on logout and login", () => {

    })

    it("No cookings banner on the login page", () => {

    })




})