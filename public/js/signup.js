document.getElementById('signUpBtn').addEventListener('click', signup);
async function signup() {
    const userNameInput = document.getElementById('userNameInput').value;
    const userMailInput = document.getElementById('userMailInput').value;
    const userPassInput = document.getElementById('userPassInput').value;
    const userConfPassInput = document.getElementById('userConfPassInput').value;
    const userPhone = document.getElementById('userPhone').value;
    const userAddressInput = document.getElementById('userAddress').value.trim();
    const userAddress = document.getElementById('userAddress');
    const isValid = userInputsValidation();
    // const month1 = document.getElementById('month1').value;
    // const month2 = document.getElementById('month2').value;
    // const month3 = document.getElementById('month3').value;
    // const month4 = document.getElementById('month4').value;
    // Basic input validation (you can customize these validation functions)
    if (!isValid) {
        // Validation failed, do not proceed with signup
        return;
    }
    const data = {
        name: userNameInput,
        email: userMailInput,
        password: userPassInput,
        phoneNumber: userPhone,
        address: userAddressInput,
    };

    try {
        const response = await fetch('https://gogreenserver-1.onrender.com/api/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.message}`);
        }

        const result = await response.json();
        // Handle the response from the server
        
        alert("Signup successful!");
        location.href = "../home.html";

        // if (response.status === 400) {
        //     // Handle the 400 error status
        //     input.classList.remove('is-valid');
        //     input.classList.add('is-invalid');
        // }
    } catch (error) {
        console.error('Error:', error);

        // Handle errors and display appropriate messages
        if (error instanceof SyntaxError) {
            const errorMessage = error.message;
            // Handle specific error messages as needed
            if (errorMessage.includes("Invalid email")) {
                alert("Invalid email format. Please provide a valid email address.");
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        } else {
            // Handle other types of errors
            // userInputsValidation()
            alert(`Unable to sign up. ${error.message}`);
        }
    }
}

/*-----------Signup Validation Functions-----------*/
// ... (Remainder of the validation functions)

function isExist(usersData) {
    const existingEmails = usersData.map(user => user.email.toLowerCase());
    return existingEmails.includes(userMailInput.value.toLowerCase());
}

// ... (Remainder of the functions)


function usernameValidation() {
    const regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    return regex.test(userNameInput.value) && userNameInput.value !== "";
}

function userEmailAlert() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(userMailInput.value) ;
}

function PhoneNumberValidation(phoneNumber) {
    const regex = /^01\d{9}$/;
    return regex.test(userPhone.value) ;
}

function userPasswordValidation() {
    const regex = /^.{5,15}$/;
    return regex.test(userPassInput.value) && userPassInput.value !== "";
}

function samePasswordCheck() {
    return userConfPassInput.value === userPassInput.value && userConfPassInput.value !== "";
}
function addressCheck() {
    const regex = /^.+$/;
    return regex.test(userAddress.value.trim());
}

function userInputsValidation() {
    const validUsername = usernameValidation();
    const validEmail = userEmailAlert();
    const validPhone = PhoneNumberValidation();
    const validPassword = userPasswordValidation();
    const validSamePassword = samePasswordCheck();
    const validAddress = addressCheck();

    handleValidationResult(validUsername, userNameInput, signUpUserNameErr);
    handleValidationResult(validEmail, userMailInput, signUpMailErrMsg);
    handleValidationResult(validPhone, userPhone);
    handleValidationResult(validPassword, userPassInput, signUpPassErrMsg);
    handleValidationResult(validSamePassword, userConfPassInput);
    handleValidationResult(validAddress, userAddress);

    return validUsername && validEmail && validPassword && validSamePassword && validAddress;
}

function handleValidationResult(isValid, element, errorElement) {
    if (isValid) {
        handleValidInput(element);
    } else {
        handleInvalidInput(element, errorElement);
    }
}

function handleValidInput(element) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    if (element.nextElementSibling) {
        element.nextElementSibling.classList.replace("d-block", "d-none");
    }
}

function handleInvalidInput(element, errorElement) {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    if (errorElement) {
        errorElement.classList.replace("d-none", "d-block");
    }
}
