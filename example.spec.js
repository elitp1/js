import {test, expect} from '@playwright/test';


test.use({ headless: false,viewport: { width: 1920, height: 1080 }, });

class Playwright_actions {
    constructor(page) {
        this.page = page;
    }

    async click_element(xpath) {
        try {
            let element = await this.page.locator(xpath);
            await element.click();
        }
        catch (error) {
            console.log(`Error clicking element with xpath ${xpath}: ${error}`);
            throw error;
        }
    }

    async enter_text(xpath, text) {
        try {
            let element = await this.page.locator(xpath);
            await element.fill(text);
        }
        catch (error) {
            console.log(`Error entering text in element with xpath ${xpath}: ${error}`);
            throw error;
        }
    }

    async wait_for_dialog() {
        try {
            let dialog = await this.page.waitForEvent('dialog', { timeout: 5000 });
            let messages = await dialog.message();
            await dialog.accept();
            return messages;
        }
        catch (error) {
            console.log(`Error handling dialog: ${error}`);
            throw error;
        }
    }

}

class DemoBlaze_page extends Playwright_actions {
    constructor(page) {
       super(page);
       this.sign_up_link = "//a[text()='Sign up']";
       this.username_field = "//input[@id='sign-username']";
       this.password_field = "//input[@id='sign-password']";
       this.sign_up_button = "//button[text()='Sign up']";
    }

    async sign_up(user, password) {
        await this.click_element(this.sign_up_link);
        await this.enter_text(this.username_field, user);
        await this.enter_text(this.password_field, password);
        await this.click_element(this.sign_up_button);
        return await this.wait_for_dialog();

    }
}

const DEMOBLAZEURL =  'https://demoblaze.com/'
test('test', async ({ page }) => {
    await page.goto(DEMOBLAZEURL);
    await page.waitForTimeout(3000);
    let DemoBlaze_page_actions = new DemoBlaze_page(page);
    let result = await DemoBlaze_page_actions.sign_up("Hilit","Prizant");
    console.log(result);
    expect (result).toBe("This user already exist.")
});

