document.getElementById('signUpBtn').addEventListener('click', signup);
async function signup() {
    const userNameInput = document.getElementById('userNameInput').value;
    const userMailInput = document.getElementById('userMailInput').value;
    const userPassInput = document.getElementById('userPassInput').value;
    const userRePassInput = document.getElementById('userRePassInput').value;
    const userPhone = document.getElementById('userPhone').value;
    const userAddress = document.getElementById('userAddress').value;
    // const month1 = document.getElementById('month1').value;
    // const month2 = document.getElementById('month2').value;
    // const month3 = document.getElementById('month3').value;
    // const month4 = document.getElementById('month4').value;
    // Basic input validation (you can customize these validation functions)

    const data = {
        name: userNameInput,
        email: userMailInput,
        password: userPassInput,
        phoneNumber: userPhone,
        address: userAddress,
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
        console.log(result);
        alert("Signup successful!");
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
    return regex.test(userMailInput.value) && userMailInput.value !== "";
}

function PhoneNumberValidation(phoneNumber) {
    const regex = /^01\d{9}$/;
    return regex.test(phoneNumber);
}

function userPasswordValidation() {
    const regex = /^.{5,15}$/;
    return regex.test(userPassInput.value) && userPassInput.value !== "";
}

function samePasswordCheck() {
    return userConfPassInput.value === userPassInput.value && userConfPassInput.value !== "";
}

function userInputsValidation() {
    const validUsername = usernameValidation();
    const validEmail = userEmailAlert();
    const validPassword = userPasswordValidation();
    const validSamePassword = samePasswordCheck();

    handleValidationResult(validUsername, userNameInput, signUpUserNameErr);
    handleValidationResult(validEmail, userMailInput, signUpMailErr);
    handleValidationResult(validPassword, userPassInput, signUpPassErr);
    handleValidationResult(validSamePassword, userConfPassInput, confPswrdErr);

    return validUsername && validEmail && validPassword && validSamePassword;
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
