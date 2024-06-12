import { test, expect } from '@playwright/test';

export default{
    baseUrl:"https://dev01-copilot.np.services.sully.ai/",
    drChronoUrl:"https://app.drchrono.com/accounts/login/",
    drChronoUserName:"shubhamb",
    drChronoUserPwd:"drchrono200?",
    userEmail:"qa.sully.ai@gmail.com",
    userGmail:"qa.sullyai@gmail.com",
    gmailPwd: "sullyaiAfterLife@0509",
    userPwd:"P@ssw0rd",
    patientName:'patient automation',
    incorrectEmail:"incorrect@gmail.com",
    incorrectPwd:"Incorrect",
    patientFirstName: "patient",
    patientLastName: "automation",
    patientPhone:"9899780176",
    patientEmail: "patient-automation@email.com",
    patientAddress: "street 001, at wonderland",
    patientState: "BigState",
    paientZip: "111000",
    patientBirthDate: "",
    userStory:`It's been a struggle, Dr. Smith. Lately, I've been overwhelmed by this feeling that everything is temporary and ultimately meaningless. It's like I'm caught in this cycle of questioning the purpose of everything I do. What's the point of it all? I used to have a clear sense of direction, but now it feels like I'm wandering through a fog, unable to see where I'm going.
    I find myself dwelling on the impermanence of life. It's disheartening to think that no matter what I achieve or experience, it's all fleeting. The weight of this existential realization has left me feeling lost and detached. It's as if I'm standing on the edge of something vast and unknowable, and it's both terrifying and isolating.
    standard treatment for allergies
    I can't pinpoint a specific trigger for these feelings; it's more like a gradual accumulation of life experiences and disappointments. Nothing seems to matter in the grand scheme of things, and I'm struggling to find meaning in the day-to-day activities that used to bring me some sense of fulfillment.
    standard treatment for fatigue
    I want to break free from this overwhelming sense of existential dread. I want to find purpose and meaning, but it feels like an elusive goal. I'm hoping that talking through these thoughts with you might provide some clarity or at least offer a starting point for me to work through this.
    Exam of knee was normal.`,
    scribeRulesKey1:'exam of knee',
    scribeRulesKey2: 'standard treatment for fatigue',
    scribeRulesKey3: 'standard treatment for allergies',
    scribeRules1:'knee- normal PE\\nMSS: no swelling, full ROM, Lachman test neg, McMurray neg, Varus and valgus neg, no joint line tenderness, no TTP over MCL, muscle strength 5/5, sensation intake B LE, no TTP over pes anserine bursa, no masses or TTP posterior fascia, no pain over fibular head',
    scribeRules2:'posterior fascia, no pain over fibular head,", "standard treatment for fatigue": "Fatigue: Check labs-CBC, TSH, Vitamin B12, Vitamin D, iron studies, ferritin.',
    scribeRules3:'Allergies: Use Zyrtec or Xyzal available over the counter, Use a Neti Pot sinus rinse, Include air filter in bedroom, 24hrs a day'
}
