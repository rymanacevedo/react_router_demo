import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
   en: {
      translation: {
         ///////////////////////////////////////
         //           Generic
         //////////////////////////////////////
         cancelBtnText: "Cancel",
         submitBtnText: "Submit",
         yes: 'Yes',
         no: 'No',
         ///////////////////////////////////////
         //           Login Page Text
         //////////////////////////////////////
         welcomeMsg: "Welcome to Amplifire",
         username: "Username",
         password: "password",
         confirmPassword: "confirm password",
         typicallyEmail: "typically your email address",
         caseSensitive: "case sensitive",
         logIn: "Log in",
         forgotUsername: "Forgot username",
         forgotPassword: "Forgot password",
         enterUsername: "Please enter your username",
         enterPassword: "Please enter your password",
         enterFirstName: "Please enter your first name",
         enterLastName: "Please enter your last name",
         enterAtLeastCharacters: "Please enter at least {{number}} characters",
         accountLockedResetPassword: "Your account is locked. Please reset your password by clicking \"Forgot password\".",
         userPassIncorrect: "Your username or password is incorrect.",
         pleaseEnterEmailAddress: "Please enter your email address",
         forgotUsernameEmailSent: "You will receive an email with your username.",
         forgotUsernameEmailFailed: "We could not send an email to this email address.  Please check your email address and try again or contact support for assistance. (Error Code: {0})",
         enterEmailAddress: "Please enter a valid email address.",
         signUpText: "Enter a username and password to log in:",
         enrollCompleteFormText: "To enroll, please complete the form below",
         reenterPasswordFormLabel: "re-enter new password",
         continueBtnText: "continue",
         passwordRuleText: "your password must be at least 5 characters long, and contain at least three of the following:",
         upperCaseRule: "Uppercase letter (A-Z)",
         passwordMustContain: "Password must contain at least 3 of the following: uppercase letters (a-z), lowercase letters (A-Z), digit (0-9), special character (!@#$% etc.)",
         lowerCaseRule: "Lowercase letter (a-z)",
         digitRule: "Digit (0-9)",
         specialCharacterRule: "Special character (!@#$% etc.) ",
         multiFactorAuthEmailSentMsg: "You will receive a verification code at {{email}}.",
         multiFactorAuthCodeInvalidError: "Your passcode is incorrect or has expired, please check the code or obtain a new one and try again.",
         multiFactorAuthCheckEmailMsg: "To login, please check your email and enter the code below:",
         multiFactorAuthRememberDevice: "Remember this device for 90 days",
         multiFactorAuthTimeoutMsg: "This code will be valid for {{duration}} minutes.",
         cookiesMessage: "This website uses cookies and third party services. Review our",
         privacyPolicy: "Privacy Policy",
         termsAndConditions: "Terms and Conditions",
         passwordsDoNotMatch: "Passwords do not match",
         passwordRequirements: "Password must be at least {{charactersNumber}} characters long, and contain at least {{numberOfCriteria}} of the following:",
         unknownError: "An unknown error occurred",
         userCreated: "Your username and password have been created",
         forgotPasswordSuccess: "An email has been sent to {{email}} with instructions on how to reset your password. ",
         weWillSendPasswordResetEmail: "We will send you an email with instructions on how to reset your password.",
         passwordResetError: "We could not send an email for this username. Please check your username and try again or contact support for assistance.",
         pleaseCompleteRecaptcha: "Please complete the reCAPTCHA.",
         pleaseCloseWindow: "Please close this window and follow the instructions in the email.",
         weWillSendEmail: "We will send you an email with your username.",
         please: "Please",
         clickHere: "click here",
         toLogIn: "to log in.",
         emailLabel: "Email",
         forgotUsernameErrorText: "We could not send an email to this email address. Please check your email address and try again or contact support for assistance.",
         accountUrlErrorText: "Account not recognized. Please check the account name in the URL.",
         passcode: "Passcode",
         pleaseEnterPasscode: "Please enter your passcode.",        
         usernameUnavailable: "This username is already in use. Please try another.",
         selfRegisterNotAllowed: "You are not allowed to self register for this account.",
         userAlreadyExistsClickBelowToLogin: 'A user with this email address already exists. Please click below to log in.',
         passwordFormatRuleText: 'Your password must contain 3 or more character types.',
         /////////////////////////////////////////////
         //   TestProgressBarMenu.tsx
         //////////////////////////////////////////////
         theScienceOfLearning:'The Science of Learning',
         about: 'About',
         minsLeft:'mins left',
         question: 'Question',
         questions: 'Questions',
         showProgress:'Show Progress',
         hideProgress: 'Hide Progress',
         viewMoreProgress: 'View More Progress',
         //////////////////////////////////
         //    AssignmentList.jsx
         //////////////////////////////////
         mins: 'mins',
         min: "min",
         minutes: 'minutes',
         minute: 'minute',
         hour: 'hour',
         hours: 'hours',
         minToComplete:'min to complete',
         attempts: 'Attempts',
         refresherAvailable: 'Refresher Available',
         //////////////////////////////////
         //    ProgressMessageComponent.tsx
         //////////////////////////////////
         fiveFastAnswers: 'You\'ll actually go faster if you slow down and read.',
         fiveSureCorrectAnswers: 'Five in a row!  Keep it going.',
         fiveSureIncorrectAnswers: 'You\'ve been sure but incorrect five times in a row. That\'s OK, you\'re here to learn. Answer accordingly if you\'re not sure about an answer.',
         sixDontKnowInRound: 'It\'s ok that you don\'t know this yet.  Make sure to read the question, answers, and explanation to learn what you don\'t know.',
         fullRoundSureCorrect: 'Perfect round! Great work!',
         twoFastReviewsInLu: `You didn't read about this concept last time. Take your time to read the explanation and you'll finish faster.`,
         fiveFastReviews: 'Slow down and absorb the material.  It will take you less time to actually learn.',
         tenLongReviews: 'You’re putting the time into reading the explanations. Good work. Its worth it.',
         twoIdenticalSureIncorrects: 'That\'s the same thing you said last time, but it still isn\'t right. Make sure to read the explanation in a couple minutes!',
         twoNpaOnLu: 'You\'ve been struggling with that concept, make sure to pay attention next time.',
         //////////////////////////////////
         //    ProgressMenu.jsx
         //////////////////////////////////
         mastered: 'Mastered',
         incorrect: 'Incorrect',
         learning: 'Learning',
         unseen: 'Unseen',
         sessionTimer: 'Session Timer',
         /////////////////////////////////////////////
         //   DataServiceExceptionComponent.tsx
         //////////////////////////////////////////////
         appErrorTitle: 'Application Error',
         appErrorText: 'Looks like you hit a snag in our system. Please wait a minute or two and try again.',
         appErrorRestartButtonText: 'restart application',
         /////////////////////////////////////////////
          //   SessionDialogComponent.tsx
          //////////////////////////////////////////////
          sessionExpiring: 'Your session is about to expire',
          staySignedInQuestion: 'Do you want to stay signed in?',
          staySignedInButton: 'Stay Signed In',
          logOutButton: 'Logout Now',
         /////////////////////////////////////////////
         //   AssignmentList.tsx
         //////////////////////////////////////////////
         yourAssignments: 'Your Assignments',
         changeCourse: 'Change Course',
         noCoursesAssigned: "You are not currently assigned to a course. Please check with your administrator.",
         /////////////////////////////////////////////
         //   LearningView.tsx
         //////////////////////////////////////////////
         clearSelection: 'Clear selection',
         nextQ: 'Next Question',
         completeMod: "Congratulations, you've completed this module!",
         /////////////////////////////////////////////
         //   LearningReviewView.tsx
         //////////////////////////////////////////////
         explainBtnText: 'Show The Explanation',
         gotIt: 'Got It',
         tryAgain: 'Try Again',
         revealCorrectAns: 'Reveal Correct Answer',
         addLearn: 'Additional Learning',
         prevQ: 'Previous Question',
         reviewing:'Reviewing',
         keepGoing:'Keep Going',
			reviewCorrectAns: 'Review correct answers',
         /////////////////////////////////////////////
         //   Question.tsx
         //////////////////////////////////////////////
         ReviewQ: 'Reviewing: Question',
         of: 'of',
         //////////////////////////////////////////////
         //   DataServiceExceptionComponent.tsx
         //////////////////////////////////////////////
         leaveFeedbackText: 'Leave feedback on this question',
         IDisagreeWithTheAnswer: 'I disagree with the answer',
         thisQuestionCouldBeImproved: 'This question could be improved',         
         iStillDontUnderstand: 'I still don’t understand',
         other: 'Other (explain)',
         placeHolderText: 'Placeholder for longer, short answer text input',
         whatYouNeedToKnow: 'What you need to know',
         wasThisExplanationHelpful: 'Was this explanation helpful?',
         leaveFeedback: 'Leave feedback',
         courseHome: 'Course Home',
          //////////////////////////////////////////////
         //   StaticAssignmentView.tsx
         //////////////////////////////////////////////
         step1ModalTitle:'How to use Amplifire',
         step1ModalContent: 'Our goal is to provide you with a focused, efficient path to mastering and retaining the information you need to be successful. The adaptive system you are using was developed based on scientific studies of how people can learn most efficiently. Click through the tour to get to know how Amplifire works.',
         step2PopoverTitle:'We first ask questions 🤔',
         step2PopoverContent:'By first answering questions, we prime your brain to acquire new knowledge, creating a mental framework for the material to be learned.',
         step3PopoverTitle:'Your estimated time left ⏰',
         step3PopoverContent: 'This is approximately how much time we think it will take you to complete this module. It will fluctuate throughout based on how you answer.',
         step4PopoverTitle:'Your Progress 📊',
         step4PopoverContent: 'Amplifire comes at you in rounds. A micro testing burst followed by a learning burst. These icons indicate how you are doing in your current round. You can also use the blue bar to see your overall progress in this module',
         step5PopoverTitle:'Your detailed progress 📊',
         step5PopoverContent: 'You can see your detailed progress that includes feedback, your road to mastery, and how long you\'ve spent in this session of learning.',
         step6PopoverTitle:'Feedback 👋',
         step6PopoverContent: 'Amplifire will help remind, encourage, and celebrate success with you as you learn',
         skipTour: 'Skip the tour',
         finishTourBtn: 'Finish tour',
         step: 'Step',
         of6: 'of 6',
         nextBtn: 'Next'         

      }
   },
   fr: {
      translation: {
         welcomeMsg: "Bienvenue à Amplifire",
         username: "Nom d'utilisateur",
         typicallyEmail: "g\u00e9n\u00e9ralement votre adresse \u00e9lectronique",
         password: "mot de passe",
         caseSensitive: "sensible \u00e0 la casse",
         logIn: "Se connecter",
         forgotUsername: "Nom d''utilisateur oubli\u00e9",
         forgotPassword: "Mot de passe oubli\u00e9",
         pleaseEnterUsername: "Veuillez saisir votre nom d''utilisateur\u00a0",
         pleaseEnterPassword: "Veuillez saisir votre mot de passe",
         accountLockedResetPassword: "Ton compte est bloqué. Veuillez réinitialiser votre mot de passe en cliquant sur \"Mot de passe oublié\".",
         userPassIncorrect: "Votre nom d''utilisateur ou votre mot de passe est incorrect.",
      }
   },
   de: {
      translation: {
         welcomeMsg: "Willkommen bei Amplifire",
         username: "Benutzername",
         typicallyEmail: "normalerweise Ihre E-Mail-Adresse",
         password: "passwort",
         caseSensitive: "Groß- und Kleinschreibung beachten",
         logIn: "Anmeldung",
         forgotUsername: "Benutzername vergessen",
         forgotPassword: "Passwort vergessen",
         pleaseEnterUsername: "Bitte geben Sie Ihren Benutzernamen ein",
         pleaseEnterPassword: "Bitte geben Sie Ihr Passwort ein",
         accountLockedResetPassword: "Ihr Konto ist gesperrt. Bitte setzen Sie Ihr Passwort zurück, indem Sie auf \"Passwort vergessen\" klicken.",
         userPassIncorrect: "Ihr Benutzername oder Ihr Passwort stimmen nicht"
      }
   },
   it: {
      translation: {
         welcomeMsg: "Benvenuto in Amplifire",
         username: "Nome utente",
         typicallyEmail: "di solito il tuo indirizzo email",
         password: "password",
         caseSensitive: "distingue tra maiuscole e minuscole",
         logIn: "Accesso",
         forgotUsername: "Nome utente dimenticato",
         forgotPassword: "Password dimenticata",
         pleaseEnterUsername: "Inserisci il nome utente",
         pleaseEnterPassword: "Inserisci la password",
         accountLockedResetPassword: "Il tuo account è bloccato. Reimposta la password facendo clic su \"password dimenticata\".",
         userPassIncorrect: "Il tuo nome utente o la password sono errati."
      }
   },
   es: {
      translation: {
         welcomeMsg: "Bienvenido a Amplifire",
         username: "nombre de usuario",
         typicallyEmail: "normalmente su direcci\u00f3n de correo electr\u00f3nico",
         password: "contrase\u00f1a",
         caseSensitive: "reconoce may\u00fasculas y min\u00fasculas",
         logIn: "Iniciar sesi\u00f3n",
         forgotUsername: "Olvid\u00e9 mi nombre de usuario",
         forgotPassword: "Olvid\u00e9 la contrase\u00f1a",
         pleaseEnterUsername: "Por favor, Introduzca su nombre de usuario:",
         pleaseEnterPassword: "Por favor, Introduzca su contrase\u00f1a",
         accountLockedResetPassword: "Tu cuenta esta bloqueada. Restablezca su contraseña haciendo clic en \"Olvidé mi contraseña\".",
         userPassIncorrect: "Su nombre de usuario o contrase\u00f1a son incorrectos."
      }
   },
   pt: {
      translation: {
         welcomeMsg: "Bem vindo a Amplifire",
         username: "nome do usu\u00e1rio",
         typicallyEmail: "geralmente seu endere\u00e7o de e-mail",
         password: "senha",
         caseSensitive: "sens\u00edvel a mai\u00fasculas e min\u00fasculas",
         logIn: "Login",
         forgotUsername: "esqueceu o nome do usu\u00e1rio?",
         forgotPassword: "esqueceu a senha?",
         pleaseEnterUsername: "Digite seu nome do usu\u00e1rio",
         pleaseEnterPassword: "Digite sua senha",
         accountLockedResetPassword: "Sua conta está bloqueada. Redefina sua senha clicando em \"esqueci a senha\".",
         userPassIncorrect: "nome do usu\u00e1rio ou senha incorreto."
      }
   }

};
//German, Portuguese, Italian, and Spanish
i18n
      .use(LanguageDetector)
      .use(initReactI18next) // passes i18n down to react-i18next
      .init({
         resources,
         // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
         // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
         // if you're using a language detector, do not define the lng option
         detection: {order: ['navigator']},
         interpolation: {
            escapeValue: false // react already safes from xss
         }
      });
i18n.services.formatter.add('capitalize', (value, lng, options) => {
   return `${value.substr(0, 1).toUpperCase()}${value.substr(1)}`;
});

export default i18n;
