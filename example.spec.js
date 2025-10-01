import { test, expect } from '@playwright/test';


test.use({ headless: false,viewport: { width: 1920, height: 1080 }, });

class Playwright_actions {
    constructor(page) {
        this.page = page;
    }

    async click_element(xpath) {
        let element = await this.page.locator(xpath);
        await element.click();
    }

    async enter_text(xpath, text) {
        let element = await this.page.locator(xpath);
        await element.fill(text);
    }
}

class DemoBlaze_page extends Playwright_actions {
    constructor(page) {
       super(page);
       this.sign_up_link = "//a[text()='Sign up']";
    }

    async sign_up() {
        await this.click_element(this.sign_up_link);
    }
}

test('test', async ({ page }) => {
    await page.goto('https://demoblaze.com/');
    await page.waitForTimeout(3000);
    let DemoBlaze_page_actions = new DemoBlaze_page(page);
    await DemoBlaze_page_actions.sign_up();
    await page.waitForTimeout(3000);
});

