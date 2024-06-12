import { test, expect } from '@playwright/test';
import locators from '../locators/locators';


export async function navigateToLoginPage(page) {
    await page.goto(locators.baseUrl);
}

export async function getcurrentDate(page) {

    const status = await page.evaluate(async () => {
        const response = await new Date().toLocaleString;
        return response;
      });
    
}