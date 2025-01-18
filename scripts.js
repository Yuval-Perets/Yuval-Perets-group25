document.addEventListener('DOMContentLoaded', () => {
    const signInForm = document.querySelector('.auth-container .auth-section:nth-child(1) .auth-form');
    const mailInput = signInForm?.querySelector('input[type="email"]');
    const passInput = signInForm?.querySelector('input[placeholder="הקלד את הסיסמה שלך"]');
    const signUpForm = document.querySelector('.auth-container .auth-section:nth-child(2) .auth-form');
    const fullNameInput = signUpForm?.querySelector('input[type="text"]');
    const emailInput = signUpForm?.querySelector('input[type="email"]');
    const phoneInput = signUpForm?.querySelector('input[type="tel"]');
    const passwordInput = signUpForm?.querySelector('input[placeholder="בחר סיסמה"]');
    const confirmPasswordInput = signUpForm?.querySelector('input[placeholder="הקלד את הסיסמה שוב"]');
    const ownerSignForm = document.querySelector('.auth-section .auth-form');
    const restaurantNameInput = ownerSignForm?.querySelector('input[placeholder="הקלד את שם המסעדה "]');
    const restEmailInput = ownerSignForm?.querySelector('input[type="email"]');
    const restPhoneInput = ownerSignForm?.querySelector('input[type="tel"]');
    const restAddressInput = ownerSignForm?.querySelector('input[placeholder="הקלד את כתובת המסעדה"]');
    const cuisineTypeInput = ownerSignForm?.querySelector('input[placeholder="הקלד את סוג המטבח"]');
    const restPasswordInput = ownerSignForm?.querySelector('input[placeholder="בחר סיסמה"]');
    const restConfirmPasswordInput = ownerSignForm?.querySelector('input[placeholder="הקלד את הסיסמה שוב"]');
    const submitButton = document.getElementById("submit-button");
    const signUpButton = document.getElementById("signin-button");
    const signLogButton = document.getElementById("signlog-btn");
    const restSignButton = document.getElementById("signRest-btn");
    const homeButton = document.getElementById("home-btn");
    
  
    function validateFullName(fullName) {
      const words = fullName.trim().split(' ');
      return words.length >= 2 && words.every(word => word.length >= 2);
    }
    
  
    function validateEmail(email) {
      return /^[^@\s]+@[^@\s]+\.com$/.test(email);
    }
  
    function validatePhone(phone) {
      return /^0\d{9}$/.test(phone);
    }

    function validatePassword(password) {
        return password.length >= 6; 
      }
  
    function validatePasswords(password, confirmPassword) {
      return password === confirmPassword;
    }

    function areAllFieldsFilled(fields) {
        return fields.every(field => field.value.trim() !== '');
      }
  
    if (submitButton) {
        submitButton.addEventListener('click', (event) => {
            if (!submitButton) {
              console.error("Submit form not found.");
              return;
            }
      
            const mail = mailInput?.value || '';
            const pass = passInput?.value || '';
            const signInFields = [mailInput, passInput];

      
            let isValid = true;
            let errorMessage = '';

            if (!areAllFieldsFilled(signInFields)) {
                isValid = false;
                errorMessage += 'יש למלא את כל השדות בטופס.\n';
              }
      
            if (!validateEmail(mail)) {
              isValid = false;
              errorMessage += 'האימייל חייב להכיל תו @ ולהסתיים ב-.com.\n';
            }

            if (!validatePassword(pass)) {
                isValid = false;
                errorMessage += 'הסיסמה חייבת להכיל לפחות 6 תווים.\n';
              }
      
            if (!isValid) {
              alert(errorMessage);
              event.preventDefault();
            } else {
              alert('התחברת בהצלחה!');
              window.location.href = 'Profile.html'; 
            }
          });
            
    } else {
        console.error("Submit button not found.");
    }

    if (signUpButton) {
      signUpButton.addEventListener('click', (event) => {
        if (!signUpForm) {
          console.error("Sign-up form not found.");
          return;
        }
  
        const fullName = fullNameInput?.value || '';
        const email = emailInput?.value || '';
        const phone = phoneInput?.value || '';
        const password = passwordInput?.value || '';
        const confirmPassword = confirmPasswordInput?.value || '';
        const signUpFields = [fullNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput];

  
        let isValid = true;
        let errorMessage = '';
  

        if (!areAllFieldsFilled(signUpFields)) {
            isValid = false;
            errorMessage += 'יש למלא את כל השדות בטופס.\n';
          }


        if (!validateFullName(fullName)) {
          isValid = false;
          errorMessage += 'שם מלא חייב להכיל לפחות 2 מילים עם 2 אותיות בכל מילה.\n';
        }
  
        if (!validateEmail(email)) {
          isValid = false;
          errorMessage += 'האימייל חייב להכיל תו @ ולהסתיים ב-.com.\n';
        }
  
        if (!validatePhone(phone)) {
          isValid = false;
          errorMessage += 'מספר הטלפון חייב להתחיל ב-0 ולהכיל 10 ספרות.\n';
        }

        if (!validatePassword(password)) {
            isValid = false;
            errorMessage += 'הסיסמה חייבת להכיל לפחות 6 תווים.\n';
          }
  
        if (!validatePasswords(password, confirmPassword)) {
          isValid = false;
          errorMessage += 'הסיסמאות אינן תואמות.\n';
        }
  
        if (!isValid) {
          alert(errorMessage);
          event.preventDefault();
        } else {
          alert('נרשמת בהצלחה!');
          window.location.href = 'Profile.html'; 
        }
      });
    } else {
      console.error("Sign-up button not found.");
    }


    if (restSignButton) {
        restSignButton.addEventListener('click', (event) => {
          if (!restSignButton) {
            console.error("Sign-up form not found.");
            return;
          }
    
          const restName = restaurantNameInput?.value || '';
          const restEmail = restEmailInput?.value || '';
          const restPhone = restPhoneInput?.value || '';
          const restAdress= restAddressInput?.value || '';
          const restCuisine= cuisineTypeInput?.value || '';
          const restPassword = restPasswordInput?.value || '';
          const restConfirmPassword = restConfirmPasswordInput?.value || '';
          const restSignFields = [restaurantNameInput, restEmailInput, restPhoneInput, restAddressInput, cuisineTypeInput, restPasswordInput, restConfirmPasswordInput];
          
          let isValid = true;
          let errorMessage = '';
    
  
          if (!areAllFieldsFilled(restSignFields)) {
              isValid = false;
              errorMessage += 'יש למלא את כל השדות בטופס.\n';
            }
  
    
          if (!validateEmail(restEmail)) {
            isValid = false;
            errorMessage += 'האימייל חייב להכיל תו @ ולהסתיים ב-.com.\n';
          }
    
          if (!validatePhone(restPhone)) {
            isValid = false;
            errorMessage += 'מספר הטלפון חייב להתחיל ב-0 ולהכיל 10 ספרות.\n';
          }

  
          if (!validatePassword(restPassword)) {
              isValid = false;
              errorMessage += 'הסיסמה חייבת להכיל לפחות 6 תווים.\n';
            }
    
          if (!validatePasswords(restPassword, restConfirmPassword)) {
            isValid = false;
            errorMessage += 'הסיסמאות אינן תואמות.\n';
          }
    
          if (!isValid) {
            alert(errorMessage);
            event.preventDefault();
          } else {
            alert('העסק נרשם בהצלחה!');
            window.location.href = 'Profile.html';
          }
        });
      } else {
        console.error("Sign-up button not found.");
      }
  
   
    if (signLogButton) {
      signLogButton.addEventListener('click', () => {
        console.log("Hey Yuval!");
        window.location.href = 'SignIn.html';
      });
    } else {
      console.error("Sign-log button not found.");
    }

    if (homeButton) {
        homeButton.addEventListener('click', () => {
          console.log("Hey Yuval!");
          window.location.href = 'HomePage.html'; 
        });
      } else {
        console.error("home button not found.");
      }
  });
  