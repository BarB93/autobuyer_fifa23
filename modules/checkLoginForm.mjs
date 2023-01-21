import {selectors} from "../consts/selectors.mjs";
import chalk from 'chalk'
export const checkLoginForm = async (Page) => {
    try {
        const form = await Page.$(selectors.loginForm.formId)
        if(form) {
            console.log(chalk.green('form is exist'))
            const emailInput = await Page.$(selectors.loginForm.emailId)
            const passwordInput = await Page.$(selectors.loginForm.passwordId)
            const signInButton = await Page.$(selectors.loginForm.loginButtonId)

            if(emailInput && passwordInput && signInButton) {
                console.log(chalk.green('all controls exist'))

                // type email
                await Page.focus(selectors.loginForm.emailId)
                await Page.keyboard.type(process.env.EMAIL)

                // type password
                await Page.focus(selectors.loginForm.passwordId)
                await Page.keyboard.type(process.env.PASSWORD)

                await signInButton.click()
            } else {
                console.log(chalk.redBright('all controls NOT exist'))
            }
        } else {
            console.log(chalk.redBright('form is NOT exist'))
        }
    } catch (e) {
        throw e
    }

}