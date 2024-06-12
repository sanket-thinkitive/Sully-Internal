import { test, expect, type Locator, type Page } from '@playwright/test';
import locators from '../locators/locators';
import { navigateToLoginPage } from '../utility/utility';

export class loginPage {

    readonly page:  Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly submitBtn: Locator;

    // ----------------------------------------------------------------------------For google Page

    readonly googleSignin: Locator;
    readonly googleEmail: Locator;
    readonly googleNxtBtn: Locator;
    readonly googlePwd: Locator;
    readonly googleSubmit: Locator;

    constructor(page: Page) {

        this.page = page;
        this.emailInput = page.locator('input[name="email"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.submitBtn = page.getByRole('button', { name: 'Submit' });

        // ------------------------------------------------------------------------Since these are on a different page and only one test case depending on this, so not creating a page object for this one.

        this.googleSignin = page.getByRole('button', { name: 'Google' });
        this.googleEmail = page.getByLabel('Email or phone');
        this.googleNxtBtn= page.getByRole('button', { name: 'Next' });
        this.googlePwd = page.getByLabel('Enter your password');



    }

    async navigateToLoginPage(){

        await this.page.goto(locators.baseUrl);


    }
    async sendForgetPasswordRequest() {

        await expect(this.page.getByRole('link', { name: 'Forgot Password?' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Forgot Password?' }).click();
        await expect(this.page.getByText('Reset Password')).toBeVisible();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('qa.sully.ai@gmail.com');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByText('We\'ve sent a password reset')).toBeVisible();
        await expect(this.page.locator('#root')).toContainText('We\'ve sent a password reset email to your registered address. Please check your inbox and follow the instructions to regain access.');
    }



    async loginWithInvalidEmailCreds(){

        await this.page.goto(locators.baseUrl);
        await this.emailInput.fill(locators.incorrectEmail);
        await this.passwordInput.fill(locators.incorrectPwd);
        await this.submitBtn.click();

    }
    async checkPageTitle(){
        await this.page.goto(locators.baseUrl);
        await this.page.waitForLoadState('networkidle');

        // await expect(this.page.locator('#root')).toContainText('Welcome back!');
        await expect(this.page.getByText('Welcome!')).toBeVisible();
        // await this.page.waitForTimeout(10000);
        await expect(this.page).toHaveTitle("Sully.ai - AI Medical Assistant");
    }

    async loginWithValidEmailCreds(){
        
        await this.page.goto(locators.baseUrl);
        await this.removeThePrivacyPopup();
        await this.emailInput.fill(locators.userEmail);
        await this.passwordInput.fill(locators.userPwd);
        await this.page.waitForLoadState('networkidle');
        await this.submitBtn.click();
        await this.page.waitForLoadState();

        await expect(this.page.getByRole('link', { name: 'Visits', })).toBeVisible({timeout: 30000});

        // await this.page.context().storageState({path: "./loginAuth.json"});
        
    }

    async firstTimeUserLoginWithValidCreds(){
        
        await this.page.goto(locators.baseUrl);
        await this.removeThePrivacyPopup();
        await this.emailInput.fill(locators.userEmail);
        await this.passwordInput.fill(locators.userPwd);
        await this.page.waitForLoadState('networkidle');
        await this.submitBtn.click();
        await this.page.waitForLoadState();
        
    }

    async loginwithGmail() {

        await this.page.goto(locators.baseUrl);

        await this.page.getByRole('button', { name: 'Google' }).click();

        const sullyPromise = this.page.waitForEvent('popup');
        
        try {
            const googlePage = await sullyPromise;
            await googlePage.waitForLoadState('domcontentloaded');
            const googleEmail = googlePage.getByLabel('Email or phone');
            const googleNxtBtn= googlePage.getByRole('button', { name: 'Next' });
            const googlePwd = googlePage.getByLabel('Enter your password');


        
            const emailInput = await googlePage.getByLabel('Email or phone');
            await emailInput.click();
            await googleEmail.fill(locators.userEmail);
            await googleEmail.press('Enter');
        
            // const passwordInput = await googlePage.getByLabel('Enter your password');

            await googlePwd.fill(locators.gmailPwd);
            await googlePwd.press('Enter');

            await googlePage.waitForLoadState('networkidle');
            await googlePage.close();


        } catch (error) {
            console.error('Error:', error);
        }
        

    }

    async removeThePrivacyPopup() {

        const popup = this.page.locator('#ppms_cm_popup_responsive_wrapper_id');

        if(await popup.isVisible()){
            await this.page.getByRole('button', { name: 'Accept all' }).click();


        }
    }



}







