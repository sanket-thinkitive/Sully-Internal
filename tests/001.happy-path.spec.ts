import { test, expect } from '@playwright/test';
import locators from '../e2e/locators/locators';
// import { createScribe, loginPage, loginWithInvalidCreds, loginWithValidCreds, validLoginWithGoogle } from '../e2e/pages/001.loginPage';
import { loginPage } from '../e2e/pages/001.loginPage';
import { navigateToLoginPage } from '../e2e/utility/utility';
import { homePage } from '../e2e/pages/002.homePage';



test('001: To validate the page title', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.checkPageTitle();

});

test('002: To validate the first time user sign-in with valid credentials and then create a scribe, and then check patient notes', async ({ page }) => {
    test.setTimeout(120000);
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.firstTimeUserLoginWithValidCreds();

    const homePge = new homePage(page);
    await homePge.createProviderProfile();
    await homePge.firstTimeUserSignIn();


    await homePge.createScribe();

    await expect(page.getByText(`Carefully crafting a note for ${locators.patientName}`)).toBeVisible({timeout: 30000});

    await homePge.checkPatientNotes();

});

test('003: To validate whether the user is validate the created provider profile', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    await homePge.validateUserProfile();
    // await hom

});

test('004: To validate whether the user is able to update notes.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.editNotes();
    await homePge.verifyNotesEdits();
});



test('006: To validate the user is able to delete patient recording/notes', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    await homePge.navigateToNotestab();
    await homePge.deleteNotes();
});


test('007: To verify user login with valid credentials.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    // await loginPge.loginWithValidEmailCreds();
    await loginPge.loginWithValidEmailCreds();

    await expect(page.getByRole('link', { name: 'Visits' })).toBeVisible();


});


test('008: To verify login with invalid credentials.', async ({ page }) => {

    const loginPge = new loginPage(page);
    await loginPge.loginWithInvalidEmailCreds();

    await expect(page.getByText('Invalid Email or Password!')).toBeVisible({timeout: 30000});
});


test('010: To ensure the user is able to add scribe rules', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.addScribeRules();   


});


test('009: To verify the user is able to create a scribe note.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.deleteAccount();
    await homePge.createScribe();

    await expect(page.getByText(`Carefully crafting a note for ${locators.patientName}`)).toBeVisible({timeout: 30000});
});



test('011: To verify the user is able to validate macros in scribe note.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.validateScribeRulesInNotes();
});

test('005: To validate whether the user is able to see summary of previous notes', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    await homePge.checkPreviousNotesSummary();


});



test('012: To validate whether the reload button is working', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    await homePge.functionalityOfReloadButton();


});


test('011: To validate whether notes are being succesfully created.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    await homePge.checkPatientNotes();
});

test('012: To validate whether the user is able to send feedback for the notes', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();

    await homePge.submitFeedbackForNotes();
});

test('013: To validate whether the user is able to add and save diagnosis.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    await homePge.checkAndSaveDiagnosis();
});

test('014: To validate whether diagnosis can be updated.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkAndSaveDiagnosis();
    await homePge.validateDiagnosisUpdate();
});

test('015: To validate whether the user is able to send diagnosis.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    await homePge.checkAndSaveDiagnosis();
    await homePge.sendMailFromDiagnosis();
});

test('016: To validate whether the user is able to add and save plans.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    await homePge.checkAndSavePlans();
});

test('017: To validate whether plans can be updated.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.validatePlansUpdate();
});

test('018: To validate whether the user is able to send plans.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    await homePge.checkAndSavePlans();
    await homePge.sendEmailsFromPlans();
});

test('019: To validate whether the user is able to save prescriptions', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.checkAndSavePrescription();
});

test('020: To validate whether the user is able to update prescriptions', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.validatePrescriptionUpdate();
});



test('021: To validate the functionality of the pause/resume button.', async ({ page }) => {
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    await homePge.checkPauseAndResumeBtn();
});



test('022: To create patient profile', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.createPatientProfile();
});

test('023: To ensure the user is able to send the notes report to specified email', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    await homePge.sendNotesReport(); 

});

test('024: To validate the functionality of the Email me the Notes button.', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.navigateToSettings();
    await homePge.enableEmailMeTheNotes();
});


test('025: To validate the user is able to add custom Notes Style', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.navigateToSettings();
    await homePge.addNotesStyle();
});


test('026: To validate the user is able to delete custom Notes Style', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.navigateToSettings();
    // await homePge.addNotesStyle();
    await homePge.deleteCustomeNotesStyle();
});




test('027: To validate the user is able to switch tabs while recording is ongoing and is not able to pick a different patient from the dropdown', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.switchingTabsScenario();

});

test('028: To validate the user is able to send a feedback', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.submitfeedback();

});

test('029: To validate the user is able to contact support', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);

    await homePge.callSupport();

});

test('030: To validate the user is able to delete a patient', async ({ page }) => {
    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();
    const homePge = new homePage(page);
    // await homePge.createScribe();
    // await homePge.checkPauseAndResumeBtn();
    // await homePge.checkPatientNotes();
    await homePge.navigateToNotestab();
    await homePge.deletePatient();
});



test('032: To ensure the user is able to delete scribe rules', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.deleteScribeRules();   


});

test('033: To ensure the user is able to add automations', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.createAutomations();


});

test('034: To ensure the user is able to check created automations', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.checkAutomations()

});

test('035: To ensure the user is able to delete automations', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.deleteMyAutomation()

});

test('036: To test whether the user is able to signout', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    // await homePge.navigateToSettings();
    // await homePge.deleteAccount();
    await homePge.signOut();

});

test('037: Validate the UI elements on settings page', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    // await homePge.navigateToSettings();
    // await homePge.deleteAccount();
    await homePge.navigateToSettings();
    await homePge.settingsPageUIValidation();

});

test('038: Validate the UI elements on Feedback page', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.feedbackpageUiValidation();

});

test('039: To ensure the user can send forgot password request', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.navigateToLoginPage();
    await loginPge.sendForgetPasswordRequest();

});

test('040: To ensure the user can connect to DrChrono', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    // await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);

    await homePge.loginToDrChrono();
    await loginPge.loginWithValidEmailCreds();
    await homePge.navigateToSettings();
    await homePge.connectToDrChrono();

});

test('041: To ensure the user can disconnect from DrChrono', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    // await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);

    await homePge.loginToDrChrono();
    await loginPge.loginWithValidEmailCreds();
    await homePge.navigateToSettings();
    await homePge.disconnectDrChrono();

});

test('042: To validate the user is able to see consent script for Ai Scribe', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.consentScriptValidation();


});

test('043: To ensure the user is able to see the support button at the top right', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.topRightSupportValidation();


});

test('044: To ensure the user is able to add personalization for diagnosis', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.addPersonalizationForDiagnosis();


});

test('045: To ensure the user is able to add personalization for Plan', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.addPersonalizationForPlan();


});

test('046: To ensure the user is able to add personalization for Prescriptions', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.addPersonalizationForPrescriptions();


});

test('047: To ensure the user is able to add personalization for Research', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.addPersonalizationForResearch();


});

test('048: To ensure the user is able to add personalization for Assistant', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.addPersonalizationForAssistant();


});

test('049: To ensure the user is able to delete personalization for diagnosis', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.deletePersonalizationForDiagnosis();


});

test('050: To ensure the user is able to delete personalization for Plan', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.deletePersonalizationForPlan();


});

test('051: To ensure the user is able to delete personalization for Prescriptions', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.deletePersonalizationForPrescriptions();


});

test('052: To ensure the user is able to delete personalization for Research', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.deletePersonalizationForResearch();


});

test('053: To ensure the user is able to delete personalization for Assistant', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);

    const homePge = new homePage(page);

    await loginPge.loginWithValidEmailCreds();
    await homePge.deletePersonalizationForAssistant();


});

test('054: To ensure the user is able to add alerts', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.addAlerts();


});

test('055: To ensure the user is able to check created alerts', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.checkCreatedAlerts();


});

test('056: To ensure the user is able to delete created alerts', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.deleteCreatedAlerts();


});

test('057: To ensure the user is able to add custom template for diagnosis', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.addCustomTempForDiagnosis();


});

test('058: To ensure the user is able to add custom template for plan', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.addCustomTempForPlan();


});

test('058: To ensure the user is able to add custom template for prescription', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.addCustomTempForPrescription();


});

test('059: To ensure the user is able to delete custom template for diagnosis', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.deleteCustomTempForDiagnosis();


});

test('060: To ensure the user is able to delete custom template for plan', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.deleteCustomTempForPlan();


});

test('061: To ensure the user is able to delete custom template for prescription', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.deleteCustomTempForPrescription();


});

test('062: To ensure regeneration in notes tab only works when the user written some intruction for regeneration', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToNotestab();
    await homePge.checkRegenerateBtnForNotes();


});

test('063: To ensure regeneration in diagnosis tab only works when the user written some intruction for regeneration', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToNotestab();
    await homePge.checkRegenerateBtnForDiagnosis();


});


test('064: To ensure regeneration in plans tab only works when the user written some intruction for regeneration', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToNotestab();
    await homePge.checkRegenerateBtnForPlans();


});

test('065: Check CRC connection', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    // await loginPge.loginWithValidEmailCreds();


    const homePge = new homePage(page);
    // await homePge.navigateToNotestab();
    // await homePge.checkRegenerateBtnForPlans();
    await homePge.connectToCrcRehab();


});

test('066: Check CRC disconection', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    // await loginPge.loginWithValidEmailCreds();


    const homePge = new homePage(page);
    // await homePge.navigateToNotestab();
    // await homePge.checkRegenerateBtnForPlans();
    await homePge.disconnectCrcRehab();


});


test('065: Delete Account', async ({ page }) => {

    test.slow();
    const loginPge = new loginPage(page);
    await loginPge.loginWithValidEmailCreds();

    const homePge = new homePage(page);
    await homePge.navigateToSettings();
    await homePge.deleteAccount();

});





















