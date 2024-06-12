import { test, expect, type Locator, type Page, type Browser } from '@playwright/test';
import locators from '../locators/locators';
import { loginPage } from './001.loginPage';


export class homePage {


    readonly page: Page;
    readonly userProfile: Locator;
    readonly patientDropdown: Locator;
    readonly startRecBtn: Locator;
    readonly pauseRecBtn: Locator;
    readonly writeTranscript: Locator;
    readonly generateNoteBtn: Locator;
    readonly patientNotes: Locator;
    readonly patientNoteHeading: Locator;
    readonly visitsTab: Locator;
    readonly notesTab: Locator;
    readonly dataCheckBox: Locator;
    readonly providerCheckBox: Locator;
    readonly acceptConsentBtn: Locator;
    readonly patientFirstName: Locator;
    readonly patientLastName: Locator;
    readonly patientPhone: Locator;
    readonly patientEmail: Locator;
    readonly patientAddress: Locator;
    readonly patientState: Locator;
    readonly patientZip: Locator;
    readonly patientBirthDate: Locator;
    readonly patienProfileKebabMenu: Locator;
    readonly patientprofileButton: Locator;
    readonly settingsTab: Locator;



    constructor(page: Page) {
        this.page = page;
        this.userProfile = page.getByText('qa.sullyai@gmail.com');
        this.patientDropdown = page.locator('.scribe-screen-container').locator('input');
        this.startRecBtn = page.getByRole('button', { name: 'Start Recording' });
        this.pauseRecBtn = page.getByRole('button', { name: 'Pause' });
        this.writeTranscript = page.getByPlaceholder('You can see the transcript');
        this.generateNoteBtn = page.getByRole('button', { name: 'Generate Note' });
        this.patientNotes = page.locator('div').filter({ hasText:`${locators.patientName}` }).first();
        this.patientNoteHeading = page.getByRole('heading', { name: `${locators.patientName}\'s Notes` });
        this.notesTab = page.getByRole('link', { name: 'Notes' });
        this.dataCheckBox = page.getByTestId('tos-checkbox');
        this.providerCheckBox = page.getByTestId('provider-checkbox');
        this.acceptConsentBtn = page.getByTestId('accept-consent-button');
        this.patienProfileKebabMenu = page.locator('.d-flex > .dropdown > div > .d-flex');
        this.patientprofileButton = page.getByRole('button', { name: 'Patient Profile' });
        this.patientFirstName = page.locator('input[name="firstName"]');
        this.patientLastName = page.locator('input[name="lastName"]');
        this.patientPhone = page.locator('input[name="phone"]');
        this.patientEmail = page.locator('input[name="email"]');
        this.patientAddress = page.locator('input[name="address"]');
        this.patientState = page.locator('input[name="state"]');
        this.patientZip = page.locator('input[name="zip"]');
        this.settingsTab = page.getByRole('button').nth(2);


        
    }

    async firstTimeUserSignIn() {

        await this.dataCheckBox.check();
        await this.providerCheckBox.check();
        await this.acceptConsentBtn.click();
    }

    async createProviderProfile() {

        await expect(this.page.getByText('Provider Profile')).toBeVisible();
        await this.page.locator('input[name="firstname"]').click();
        await this.page.locator('input[name="firstname"]').fill('first');
        await this.page.locator('input[name="firstname"]').press('Tab');
        await this.page.locator('input[name="lastname"]').fill('last');
        await this.page.locator('input[name="lastname"]').press('Tab');
        await this.page.locator('input[name="phone"]').fill('98997801256');
        await this.page.locator('input[name="phone"]').press('Tab');
        await this.page.locator('select[name="type"]').selectOption('individual');
        await this.page.locator('select[name="type"]').press('Tab');
        await this.page.locator('input[name="organization"]').fill('Org');
        await this.page.locator('input[name="organization"]').press('Tab');
        await this.page.locator('div').filter({ hasText: /^Type or select Speciality\.\.\.$/ }).nth(1).click();
        await this.page.getByText('Cardiology', { exact: true }).click();
        await this.page.locator('div').filter({ hasText: /^Type or select ehr\.\.\.$/ }).nth(3).click();
        await this.page.getByText('AthenaHealth', { exact: true }).click();
        await this.page.locator('input[name="address"]').click();
        await this.page.locator('input[name="address"]').fill('Street 01');
        await this.page.locator('input[name="address"]').press('Tab');
        await this.page.locator('input[name="city"]').fill('City');
        await this.page.locator('input[name="city"]').press('Tab');
        await this.page.locator('input[name="state"]').fill('State');
        await this.page.locator('input[name="state"]').press('Tab');
        await this.page.locator('input[name="zip"]').fill('90054');
        await expect(this.page.locator('form').filter({ hasText: 'Provider ProfileFirst' }).getByRole('button')).toBeVisible();
        await this.page.locator('form').filter({ hasText: 'Provider ProfileFirst' }).getByRole('button').click();

    }

    async validateUserProfile() {
        await this.page.locator('div').filter({ hasText: /^Q$/ }).nth(1).click();
        await this.page.getByRole('button', { name: 'Profile', exact: true }).click();
        await expect(this.page.getByText('Provider Profile')).toBeVisible();
    }

    async createScribe() {

       await this.patientDropdown.fill(locators.patientName);
       await this.patientDropdown.press('Enter');
       await this.page.waitForTimeout(2000);
       await this.startRecBtn.click();
       await this.writeTranscript.fill(locators.userStory);
       await this.generateNoteBtn.click();

       await this.page.waitForLoadState('networkidle');
    
        
    }

    async checkPauseAndResumeBtn() {
        

        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await this.page.waitForTimeout(3000);
        await this.startRecBtn.isEnabled();
        await this.startRecBtn.click();
        await this.page.waitForTimeout(3000);

        await this.pauseRecBtn.isEnabled();
        await this.page.waitForTimeout(3000);
        await this.pauseRecBtn.click();
        await this.page.close();
    }

    async checkPatientNotes() {


        await this.notesTab.click();
        await expect(this.page.getByText('Today')).toBeVisible({timeout: 120000});

        await expect(this.page.getByText('patient automation')).toBeVisible();
        await this.page.getByText('patient automation').click();
        await expect(this.page.getByRole('textbox')).toContainText('HPI:');

}

    async createPatientProfile() {

        const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000).toString(); // create random zip code

        await this.notesTab.click();

        await this.patienProfileKebabMenu.nth(1).click(); //add index to kebebMenu Locator
        await this.patientprofileButton.click();

// selects the first patient in the list
        await this.page.locator('a').filter({ hasText: 'Edit' }).nth(1).click();

        await this.patientFirstName.click();
        await this.patientFirstName.fill(locators.patientFirstName);
        await this.patientFirstName.press('Tab');
        await this.patientLastName.fill(locators.patientLastName);
        await this.patientLastName.press('Tab');
        await this.patientPhone.fill(locators.patientPhone);
        await this.patientPhone.press('Tab');
        await this.patientEmail.fill(locators.patientEmail);
        await this.patientEmail.press('Tab');
        await this.patientAddress.fill(locators.patientAddress);
        await this.patientAddress.press('Tab');
        await this.patientState.fill(locators.patientState);
        await this.patientState.press('Tab');
        await this.patientZip.fill(randomSixDigitNumber); //passed random six digit number to Zip code
        //await this.patientZip.press('Tab');

        // the below code for datepicker is not working
       // await this.page.locator("//label[text()='Birth Date']").click();
        await this.page.locator("(//input[@type='text'])[2]").fill('19/11/1965'); //added locator for date picker

        await this.page.getByRole('button', { name: 'Save' }).click();

        // assertion to check whether the patient profile has been updated
        await expect(this.page.getByText('Patient profile update')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();


    }

    async editNotes() {
        
        await this.notesTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.patientNotes).toBeVisible();
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();

        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);

        // await this.page.getByRole('heading', { name: 'CC(s):' }).click();
        await this.page.getByRole('heading', { name: 'CC(s):' }).fill('CC(s): Text added to see whether notes are being updated or not.');
        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForLoadState('networkidle');
        // await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async navigateToNotestab() {
        
        await this.notesTab.click();
        // await this.patientNotes.click();
    }


    async verifyNotesEdits() {
        
        await this.notesTab.click({timeout:30000});
        // await expect(this.patientNotes).toBeVisible({timeout:30000});
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();

        await this.page.waitForTimeout(1000);
        await expect(this.page.getByText('CC(s): Text added to see whether notes are being updated or not.')).toBeVisible({timeout: 30000});
    }

    async checkAndSaveDiagnosis() {
        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        //await this.page.getByText('patient automation', { exact: true }).click();
        //await this.page.locator("//div[@id='react-select-3-placeholder']").click();
       
       // await this.page.getByText('Select patient...').click();
       
        await this.page.locator('.css-8mmkcg').first().click();
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        // await this.page.getByText('DDx:').click();
        // await this.page.locator('p').filter({ hasText: 'DDx:' }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.getByText('DDx:').fill('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes');

        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    // async updateDiagnosis() {
    //     await this.page.getByRole('link', { name: 'Diagnosis' }).click();
    //     await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(3).click();
    //     await this.page.getByText('patient automation', { exact: true }).click();
    //     await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled();
    //     // await this.page.getByText('DDx:').click();
    //     // await this.page.locator('p').filter({ hasText: 'DDx:' }).click();
    //     await this.page.getByText('DDx:').fill('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes');

    //     await this.page.waitForTimeout(1000);

    //     await this.page.getByRole('button', { name: 'Save' }).click();
    //     await this.page.waitForLoadState('networkidle');
    // }

    async validateDiagnosisUpdate() {

        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.getByText('patient automation', { exact: true }).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible();
        await expect(this.page.getByText('DDx: Text added in differential diagnosis to test whether the user is able to update diagnosis notes')).toBeVisible({timeout: 30000});
        

    }



    async sendMailFromDiagnosis() {

        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();

        this.page.getByRole('button', { name: 'Send', exact: true }).click();

        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('Send Diagnosis Report');
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('qa.sully.ai@gmail.com');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();


    }



    async checkAndSavePlans() {
        await this.page.getByRole('link', { name: 'Plans' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Suggested Clinical Plan:').fill('Suggested Clinical Plan: Text added in plans to test whether the user is able to update plans notes');
        await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }



    async validatePlansUpdate() {

        await this.page.getByRole('link', { name: 'Plans' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible();
        await expect(this.page.getByText('Suggested Clinical Plan: Text added in plans to test whether the user is able to update plans notes')).toBeVisible({timeout: 30000});
        

    }

    async sendEmailsFromPlans() {

        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();

        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('Send Diagnosis Report');
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('qa.sully.ai@gmail.com');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();


    }

    async checkAndSavePrescription() {
        await this.page.getByRole('link', { name: 'Prescription' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await expect(this.page.getByRole('button', { name: 'Save' })).toBeEnabled({timeout:90000});
        await this.page.waitForLoadState('networkidle');

        await this.page.getByText('Prescription and medication plan:').fill('Prescription and medication plan: Text added in plans to test whether the user is able to update prescriptions');
        await this.page.waitForTimeout(1000);

        await expect(this.page.getByRole('button', { name: 'Order Prescription' })).toBeVisible();

        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.waitForLoadState('networkidle');
    }

    async validatePrescriptionUpdate() {

        await this.page.getByRole('link', { name: 'Prescription' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.locator('.css-8mmkcg').first().click(); //changed loacator for diagnosis dropdown
        await this.page.locator('svg').nth(1).click();
        await this.page.locator('#react-select-3-option-0').click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('textbox')).toBeVisible({timeout:10000});
        await expect(this.page.getByText('Prescription and medication plan: Text added in plans to test whether the user is able to update prescriptions')).toBeVisible({timeout: 30000});
        

    }

    async deleteNotes() {
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();
        
        await this.page.locator('#editor-containertGRwk8Mud8').getByRole('button').nth(1).click();

        await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async navigateToSettings() {

        await this.settingsTab.click();
        await expect(this.page.getByText('Settings')).toBeVisible();

    }

    async enableEmailMeTheNotes() {

        
        await this.page.getByRole('link', { name: 'Email me the Notes' }).click();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill(locators.userEmail);
        await this.page.getByLabel('Profile').locator('label span').click();
        await this.page.getByRole('button', { name: 'Save' }).click();

        await this.page.locator('div').filter({ hasText: /^Copilot Settings$/ }).locator('path').click();

        await expect(this.page.locator('#root')).toContainText(locators.userEmail);
    }

    async loginToDrChrono() {


    await this.page.goto('https://app.drchrono.com/accounts/login/');
    await this.page.getByPlaceholder('Username').click();
    await this.page.getByPlaceholder('Username').fill('shubhamb');
    await this.page.getByPlaceholder('Password').click();
    await this.page.getByPlaceholder('Password').click();
    await this.page.getByPlaceholder('Password').fill('drchrono200?');
    await this.page.getByRole('button', { name: 'Log In' }).click();

    }

    async connectToDrChrono() {

        const isConnected = this.page.getByRole('link', { name: 'Connected to' });

        if(await isConnected.isVisible()){

            await this.disconnectDrChrono();
            await this.navigateToSettings();

        }


        await this.page.getByRole('link', { name: 'Connect to Connect to DrChrono' }).click();
        await this.page.locator('#org_id').click();
        await this.page.locator('#org_id').fill('parikhhealth');
        const page4Promise = this.page.waitForEvent('popup', {timeout: 30000});
        await this.page.waitForLoadState('networkidle');
        await this.page.getByRole('button', { name: 'Connect to DrChrono' }).click();
        const page4 = await page4Promise;
        await page4.locator('.css-19bb58m').click();
        await page4.getByRole('option', { name: 'Chaitanya Gharpure' }).click();
        await page4.getByRole('button', { name: 'Done' }).click();
        await expect(page4.getByRole('link', { name: 'Visits' })).toBeVisible();

    }

    async disconnectDrChrono() {
        await expect(this.page.getByRole('link', { name: 'Connected to' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Connected to' }).click();
        await expect(this.page.locator('#root')).toContainText('Congratulations! Your DrChrono is now superpowered with Sully.ai');
        await this.page.getByRole('button', { name: 'Disconnect' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();

    }

    async addNotesStyle() {

        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();


        await this.page.getByRole('combobox').first().selectOption('custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'OK' }).click();
        
        await this.page.getByRole('textbox').first().click();
        await this.page.getByRole('textbox').first().fill('test-automation-styled-notes');
        await this.page.getByLabel('Note Types').locator('div').filter({ hasText: 'Name of this Note type' }).getByRole('combobox').selectOption('apso');
        await this.page.waitForLoadState();
        await this.page.getByRole('button', { name: 'Save & Set as Default', exact: true }).click();

    }

    async deletePatient() {
        await this.patienProfileKebabMenu.nth(1).click();  //changed locator of patient profile

        await this.page.getByRole('button', { name: 'Delete Patient' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async deleteAccount() {

        await this.page.getByRole('link', { name: 'Delete Account' }).click();

        
    }

    async submitfeedback() {
        // await this.page.getByRole('link', { name: 'Feedback' }).click();
        await expect(this.page.getByRole('button', { name: 'Send Feedback Send Feedback' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send Feedback Send Feedback' }).click();
        await this.page.locator('input[name="subject"]').click();

        await this.page.locator('input[name="subject"]').fill('patient automation feedback');
        await this.page.locator('input[name="subject"]').press('Tab');
      //  await this.page.locator('input[name="phone"]').fill('9899780176'); // Commented out this line as phone number field is not present
        await this.page.locator('textarea[name="message"]').click();
        await this.page.locator('textarea[name="message"]').fill('Test Message');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator("//div[@class='modal-body']")).toContainText("Your feedback has been shared with the team, you'll recieve a confirmation email shortly."); //changed locator and confirmation message
        await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async callSupport() {

        // await this.page.getByRole('link', { name: 'Support', exact: true }).click();

        await this.page.getByRole('button', { name: 'Support Available 24/7 Support' }).click();
        await this.page.locator('input[name="subject"]').click();
        await this.page.locator('input[name="subject"]').fill('patient automation contact support');
        await this.page.locator('input[name="subject"]').press('Tab');
        await this.page.locator('input[name="phone"]').fill('9899780179');
        await this.page.locator('textarea[name="message"]').click();
        await this.page.locator('textarea[name="message"]').fill('User\'s complain about crashed UI');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.locator("//div[@class='modal-body']")).toContainText('Your request has been submitted to our support team, you\'ll recieve a confirmation email shortly.'); //changed locator of dialog box
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

    async signOut() {

        await this.page.locator('.initials-avatar').click();
        await expect(this.page.getByRole('button', { name: 'Logout' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Logout' }).click();
    }

    async switchingTabsScenario() {
        
        //await this.page.locator('div').filter({ hasText: /^Add or select patient\.\.\.$/ }).nth(2).click();
      //  await this.page.locator('div').filter({ hasText: /^Add or select patient\.\.\.$/ }).nth(2).fill('patient automation');
       // await this.page.locator("//div[text()='Add or select patient...']").click();
        await this.page.locator("//input[@id='react-select-2-input']").fill('patient automation');
        await this.page.keyboard.press('Enter');
      //  await this.page.getByText('patient automation', { exact: true }).click();
        await this.page.locator("//button[@class='recording-action-btn btn btn-primary']").click();
        await this.page.getByRole('link', { name: 'Notes' }).click();
       // await expect(this.page.locator('#root')).toContainText('patient automation');
        await this.page.getByRole('link', { name: 'Visits' }).click();
        await expect(this.page.locator("//button[@class='recording-action-btn btn btn-primary']")).toContainText('Pause');
        await expect(this.page.getByRole('group')).toContainText('Generate Note');
        await expect(this.page.locator('#root')).toContainText('patient automation');

    }

    async settingsPageUIValidation(){

        await expect(this.page.getByRole('link', { name: 'EHR Integration' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Note Styles' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Scribe Rules' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Email me the Notes' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Connect to DrChrono' })).toBeVisible();
        // await expect(this.page.getByRole('link', { name: 'Connect to athenahealth' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Connect to Elation' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Connect to Cerner' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Connect to Epic' })).toBeVisible();
        await expect(this.page.getByText('Select Microphone')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Feedback' }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Support' }).nth(1)).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Sign Out' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Version' })).toBeVisible();

    }


    async feedbackpageUiValidation(){
        
        await this.page.getByRole('link', { name: 'Feedback' }).click();

        await expect(this.page.getByText('Provide Feedback')).toBeVisible();
        await expect(this.page.getByText('Available 24/')).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Call or Text +1 (650) 207-' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Whatsapp +1 (650) 280-' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Email Support@sully.ai' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Schedule a meeting Book a' })).toBeVisible();
        await expect(this.page.getByText('Submit feedback form')).toBeVisible();
        await expect(this.page.locator('input[name="subject"]')).toBeVisible();
        await expect(this.page.locator('input[name="phone"]')).toBeVisible();
        await this.page.locator('form i').hover();
        await expect(this.page.getByText('if you provide a contact')).toBeVisible();
        await this.page.locator('textarea[name="message"]').click();
        await expect(this.page.locator('textarea[name="message"]')).toBeVisible();
    }

    async submitFeedbackForNotes(){

        await this.notesTab.click();
        await this.page.waitForLoadState('networkidle');
        await expect(this.patientNotes).toBeVisible();

        await this.page.getByText('patient automation').first().click();
        await expect(this.page.getByText('Rate this note')).toBeVisible();
        await this.page.locator('form').getByRole('img').nth(4).click();
        await expect(this.page.getByText('Tell us more')).toBeVisible();
        await this.page.getByPlaceholder('Write your feedback here...').click();
        await this.page.getByPlaceholder('Write your feedback here...').fill('review message');
        await expect(this.page.getByRole('button', { name: 'Send Feedback', exact: true })).toBeVisible();

        await this.page.getByRole('button', { name: 'Send Feedback', exact: true }).click();

    }

    async addScribeRules() {
        await this.page.getByRole('link', { name: 'Scribe Rules' }).click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.getByRole('button', { name: 'Add Rule' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Add Rule' }).click();

        await this.page.locator('dl').filter({ hasText: 'Rule #1' }).locator('div').fill(locators.scribeRulesKey1);
        await this.page.getByPlaceholder('replace with...').click();

        await this.page.getByPlaceholder('replace with...').fill(locators.scribeRules1);
        await this.page.getByRole('button', { name: 'Add Rule' }).click();
        await this.page.locator('dl').filter({ hasText: 'Rule #2' }).locator('div').click();
        await this.page.locator('dl').filter({ hasText: 'Rule #2' }).locator('div').fill(locators.scribeRulesKey2);
        await this.page.locator('dl').filter({ hasText: 'Rule #2' }).getByPlaceholder('replace with...').click();
        await this.page.locator('dl').filter({ hasText: 'Rule #2' }).getByPlaceholder('replace with...').fill(locators.scribeRules2);
        await this.page.getByRole('button', { name: 'Add Rule' }).click();
        await this.page.locator('dl').filter({ hasText: 'Rule #3' }).locator('div').click();
        await this.page.locator('dl').filter({ hasText: 'Rule #3' }).locator('div').fill(locators.scribeRulesKey3);
        await this.page.locator('dl').filter({ hasText: 'Rule #3' }).getByPlaceholder('replace with...').click();
        await this.page.locator('dl').filter({ hasText: 'Rule #3' }).getByPlaceholder('replace with...').fill(locators.scribeRules3);
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Save' }).click();

    }

    async validateScribeRulesInNotes(){
        await this.notesTab.click({timeout:30000});
        await this.page.getByText('patient automation').first().click();
        await this.page.waitForLoadState();
        await expect(this.page.getByRole('textbox')).toContainText('Macros:');
        await expect(this.page.getByRole('textbox')).toContainText('exam of knee:');
        await expect(this.page.getByRole('textbox')).toContainText('standard treatment for fatigue:');
        await expect(this.page.getByRole('textbox')).toContainText('standard treatment for allergies:');
    }

    async deleteScribeRules() {

        this.addScribeRules();

        await this.page.getByRole('link', { name: 'Scribe Rules' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator('dd').filter({ hasText: 'knee- normal PE\\nMSS: no' }).getByRole('button').click();
        await this.page.locator('dd').filter({ hasText: 'posterior fascia, no pain' }).getByRole('button').click();
        await this.page.locator('dd').filter({ hasText: 'Allergies: Use Zyrtec or' }).getByRole('button').click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    async functionalityOfReloadButton(){

        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.startRecBtn.click();

        await this.page.getByRole('button', { name: 'Pause' }).click();

        // reload button
        await this.page.locator('div').filter({ hasText: /^patient automation View Patient$/ }).getByRole('button').nth(1).click();

        await this.page.getByRole('button', { name: 'OK' }).click();


     }

     async createAutomations() {
        // await this.page.getByRole('link', { name: 'Automations', exact: true }).click();

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();
        await expect(this.page.getByText('Create Automation')).toBeVisible();
        await expect(this.page.getByRole('heading', { name: 'What would you like to' })).toBeVisible();

        await this.page.locator('#rule-speech-input').click();
        await this.page.locator('#rule-speech-input').fill('When I say "follow up in 2 weeks" send an SMS to the patient to schedule an appointment.');
        await this.page.getByText('Generate').click();
        await expect(this.page.getByRole('heading', { name: 'Here\'s your automation!' })).toBeVisible();
        await expect(this.page.getByText('Reorder or edit the steps')).toBeVisible();
        await expect(this.page.getByText('Step 1:')).toBeVisible();
        await expect(this.page.getByText('Step 2:')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Submit Automation' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit Automation' }).click();

     }

     async checkAutomations() {

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();

        await expect(this.page.getByRole('link', { name: 'My Automations' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Automations' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByRole('button', { name: 'Automation #1', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();

     }

     async deleteMyAutomation() {

        await this.page.getByRole('link', { name: 'Automations Automations' }).click();
        await expect(this.page.getByRole('link', { name: 'My Automations' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Automations' }).click();
        await this.page.getByRole('button', { name: 'Automation #1', exact: true }).getByRole('button').click();
        await expect(this.page.getByText('Are you sure you want to')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        // await expect(this.page.getByRole('heading', { name: 'You don\'t have any' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();
        await expect(this.page.getByText('Create Automation')).toBeVisible();

     }

     async sendNotesReport() {
        await this.navigateToNotestab()
        // await this.patientNotes.click();
        await this.page.locator("(//div//p[@id='note-item-head-title'])[1]").click();  //changed locator of patient selection
        await expect(this.page.getByRole('button', { name: 'Send', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Send', exact: true }).click();
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');

        await expect(this.page.locator('form').filter({ hasText: 'IMPORTANT: This feature is' }).getByRole('button')).toBeVisible();
        await this.page.locator('form').filter({ hasText: 'IMPORTANT: This feature is' }).getByRole('button').click();
        await expect(this.page.getByText('Are you sure you want to send')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();


     }

     async consentScriptValidation(){

        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');



        await expect(this.page.locator('#root')).toContainText('IMPORTANT: Please remember to obtain verbal consent from patients before recording the visit using Sully.ai. [See sample script]');
        await this.page.getByRole('link', { name: '[See sample script]' }).click();
        await expect(this.page.getByRole('dialog')).toContainText('Patient consent script for AI scribe');
        await expect(this.page.getByText('Consent script: Before we')).toBeVisible();
        await this.page.getByLabel('Close').click();
     }

     async topRightSupportValidation() {

        await expect(this.page.getByRole('button', { name: 'Support Available 24/7 Support' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Support Available 24/7 Support' }).click();
        await expect(this.page.getByText('Contact Support')).toBeVisible();
     }

     async deleteCustomeNotesStyle(){

        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();

        await this.page.getByRole('combobox').first(). selectOption('test-automation-styled-notes');
        await this.page.waitForLoadState();
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await expect(this.page.getByRole('button', { name: 'Delete Note' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Note' }).click();
        await expect(this.page.getByText('Confirm')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async addPersonalizationForDiagnosis() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await expect(this.page.getByLabel('Diagnosis')).toBeVisible();
        await this.page.getByRole('textbox', { name: 'Instruction' }).click();
        await this.page.getByRole('textbox', { name: 'Instruction' }).fill('Append "Created by automation test" at the last of each diagnosis.');
        await expect(this.page.getByRole('button', { name: 'Submit' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit' }).click();

     }

     async addPersonalizationForPlan() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await this.page.getByRole('tab', { name: 'Plan' }).click();
        await this.page.getByRole('textbox', { name: 'Instruction' }).click();

        await this.page.getByRole('textbox', { name: 'Instruction' }).fill('Append "Created with automation test" at the end of the generated plans');
        await this.page.getByRole('button', { name: 'Submit' }).click();

     }

     async addPersonalizationForPrescriptions() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await this.page.getByRole('tab', { name: 'Prescriptions' }).click();
        await this.page.getByRole('textbox', { name: 'Instruction' }).click();

        await this.page.getByRole('textbox', { name: 'Instruction' }).fill('Append "Created with automation tests" at the end of prescriptions');
        await this.page.getByRole('button', { name: 'Submit' }).click();
     }

     async addPersonalizationForAssistant() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await this.page.getByRole('tab', { name: 'Assistant' }).click();
        await this.page.getByRole('textbox', { name: 'Instruction' }).click();

        await this.page.getByRole('textbox', { name: 'Instruction' }).fill('Append "created with automation tests" at the end of the generated response.');
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async addPersonalizationForResearch() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await this.page.getByRole('tab', { name: 'Research' }).click();

        await this.page.getByRole('textbox', { name: 'Instruction' }).fill('Append "Created with automation tests" at the end of created response');
        await this.page.getByRole('button', { name: 'Submit' }).click();
     }

     async deletePersonalizationForDiagnosis() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await expect(this.page.getByLabel('Diagnosis')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async deletePersonalizationForPlan() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();
        await this.page.getByRole('tab', { name: 'Plan' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByLabel('Plan')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async deletePersonalizationForPrescriptions() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();

        await this.page.getByRole('tab', { name: 'Prescriptions' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByLabel('Prescriptions')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async deletePersonalizationForAssistant() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();

        await this.page.getByRole('tab', { name: 'Assistant' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByLabel('Assistant')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async deletePersonalizationForResearch() {

        await this.settingsTab.click();
        await this.page.getByRole('link', { name: 'Personalization' }).click();

        await this.page.getByRole('tab', { name: 'Research' }).click();
        await this.page.waitForLoadState();
        await expect(this.page.getByLabel('Research')).toBeVisible();
        await this.page.getByRole('button', { name: '' }).click();
        await this.page.getByRole('button', { name: 'Submit' }).click();


     }

     async addAlerts() {

        await expect(this.page.getByRole('link', { name: 'Alerts Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Alerts Alerts' }).click();
        await expect(this.page.getByText('Create Alert')).toBeVisible();
        await this.page.locator('#rule-speech-input').click();
        await this.page.locator('#rule-speech-input').fill('When a patient\'s blood pressure is higher than 140/90, send an SMS to me about it.');
        await this.page.getByText('Generate').click();
        await expect(this.page.getByRole('heading', { name: 'Here\'s your automation!' })).toBeVisible();
        await expect(this.page.getByText('Step 1:')).toBeVisible();
        await expect(this.page.getByText('Step 2:')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Submit Alert' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Submit Alert' }).click();
     }

     async checkCreatedAlerts() {
        await this.page.getByRole('link', { name: 'Alerts', exact: true }).click();
        await expect(this.page.getByRole('link', { name: 'My Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'My Alerts' }).click();
        await expect(this.page.getByRole('button', { name: 'Alert #1', exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'Close' }).click();

     }

     async deleteCreatedAlerts() {

        await expect(this.page.getByRole('link', { name: 'Alerts Alerts' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Alerts Alerts' }).click();
        await expect(this.page.getByText('Create Alert')).toBeVisible();
        await this.page.getByRole('link', { name: 'My Alerts' }).click();
        await this.page.getByRole('button', { name: 'Alert #1', exact: true }).getByRole('button').click();
        await this.page.getByRole('button', { name: 'Alert #1', exact: true }).getByRole('button')
        await expect(this.page.getByText('Confirm')).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.getByRole('button', { name: 'Close' }).click();
     }

     async checkPreviousNotesSummary() {

        await this.patientDropdown.fill(locators.patientName);
        await this.patientDropdown.press('Enter');
        await expect(this.page.getByText('Previous visit:')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Start Recording' })).toBeEnabled();

     }

     async addCustomTempForDiagnosis() {

        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Diagnosis Templates' }).click();
        await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await this.page.waitForLoadState();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template Automation');
        await this.page.waitForLoadState();
        // await this.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'Save', exact: true }).click();
        await this.page.waitForLoadState('networkidle');
        // await this.page.waitForTimeout(1000);

     }

     async addCustomTempForPlan() {
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Plan Templates' }).click();
        await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await expect(this.page.getByText('Name of this Plan')).toBeVisible();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template');
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();

     }


     async addCustomTempForPrescription() {
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Prescription Templates' }).click();
        await this.page.getByRole('combobox').first().selectOption('Create Custom');
        await expect(this.page.getByText('Name of this Prescription')).toBeVisible();
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').fill('Test Template');
        await this.page.getByRole('button', { name: 'Save', exact: true }).click();

     }

     async deleteCustomTempForDiagnosis() {
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Diagnosis Templates' }).click();
        await this.page.getByLabel('Diagnosis Templates').getByRole('combobox').selectOption('Test Template Automation');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async deleteCustomTempForPlan(){
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Plan Templates' }).click();
        await this.page.getByLabel('Plan Templates').getByRole('combobox').selectOption('Test Template');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async deleteCustomTempForPrescription(){
        await this.page.getByRole('link', { name: 'Note Styles Multiple options' }).click();
        await this.page.getByRole('tab', { name: 'Prescription Templates' }).click();
        await this.page.getByLabel('Prescription Templates').getByRole('combobox').selectOption('Test Template');
        await expect(this.page.getByRole('button', { name: 'Delete Template' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Delete Template' }).click();
        await expect(this.page.getByText('Confirm', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();

     }

     async checkRegenerateBtnForNotes() {
        await this.notesTab.click({timeout:30000});
        // await expect(this.patientNotes).toBeVisible({timeout:30000});
        // await this.patientNotes.click();
        await this.page.getByText('patient automation').first().click();
        await expect(this.page.getByRole('button', { name: 'Regenerate' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await expect(this.page.getByPlaceholder('Add note regeneration')).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.page.waitForTimeout(1000);

     }
     async checkRegenerateBtnForDiagnosis() {
        await this.page.getByRole('link', { name: 'Diagnosis' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.getByText('patient automation', { exact: true }).click();
        await expect(this.page.getByRole('button', { name: 'Regenerate' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async checkRegenerateBtnForPlans() {
        await this.page.getByRole('link', { name: 'Plans' }).click();
        await this.page.locator('div').filter({ hasText: /^Select patient\.\.\.$/ }).nth(2).click();
        await this.page.getByText('patient automation', { exact: true }).click();
        await expect(this.page.getByRole('button', { name: 'Regenerate' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await this.page.getByRole('button', { name: 'Regenerate' }).click();
        await expect(this.page.getByText('Alert', { exact: true })).toBeVisible();
        await this.page.getByRole('button', { name: 'OK' }).click();
     }

     async connectToCrcRehab() {

        await this.page.goto('https://crehab-emr-dev.web.app/login');
        await this.page.getByLabel('email').click();
        await this.page.getByLabel('email').fill('testclinician1@crehab.com');
        await this.page.getByLabel('password Forgot Password?').click();
        await this.page.getByLabel('password Forgot Password?').fill('temp12345');
        await this.page.getByRole('button', { name: 'sign in' }).click();
        await expect(this.page.getByRole('heading', { name: 'Patients' })).toBeVisible();

        await this.page.goto(locators.baseUrl);
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');
        await this.page.locator('input[name="email"]').press('Tab');
        await this.page.locator('input[name="password"]').fill('P@ssw0rd');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Settings' }).click();
        await this.page.getByRole('link', { name: 'Connect to Connect to CRC' }).click();
        await this.page.waitForTimeout(2000);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator('#org_id').click();
        await this.page.locator('#org_id').fill('crehabc');
        await this.page.getByRole('button', { name: 'Connect to Comprehensive' }).click();
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('textbox').click();
        await this.page.getByRole('textbox').press('Meta+a');
        await this.page.getByRole('textbox').fill('testclinician1@crehab.com');
        await this.page.waitForTimeout(1000);
        await this.page.getByRole('button', { name: 'Done' }).click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator('#root')).toContainText('New SNF Consult');



     }

     async disconnectCrcRehab() {

        await this.page.goto(locators.baseUrl);
        await this.page.locator('input[name="email"]').click();
        await this.page.locator('input[name="email"]').fill('shubham@sully.ai');
        await this.page.locator('input[name="email"]').press('Tab');
        await this.page.locator('input[name="password"]').fill('P@ssw0rd');
        await this.page.getByRole('button', { name: 'Submit' }).click();
        await expect(this.page.getByRole('link', { name: 'Visits' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Settings' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Settings' }).click();

        await expect(this.page.getByRole('link', { name: 'Connected to Connect to CRC' })).toBeVisible();
        await this.page.getByRole('link', { name: 'Connected to Connect to CRC' }).click();
        await this.page.getByRole('button', { name: 'Disconnect' }).click();



     }







    



}