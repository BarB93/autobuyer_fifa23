import chalk from "chalk";
import {selectors} from "../consts/selectors.mjs";
export const checkLoginButton = async (Page) => {
    try {
        const [button] = await Page.$x(selectors.loginButton$x);
        if (button) {
            console.log(chalk.green('button login exist'))
            await button.click()
        } else {
            console.log(chalk.redBright('button login not!!!'))
        }
    } catch (e) {
        throw e
    }
}