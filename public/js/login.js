document.getElementById('signInBtn').addEventListener('click', login);

const signInUserMailErr = document.getElementById("signInUserMailErr");
const signInUserPassErr = document.getElementById("signInUserPassErr");
const signInBtn = document.getElementById("signInBtn");

/*-----------Login Function-----------*/
async function login() {
    // Reset error messages
    signInUserMailErr.innerText = "";
    signInUserPassErr.innerText = "";

    // Fetch input values
    const emailInput = document.getElementById('loginMailInput');
    const passwordInput = document.getElementById('loginPassInput');
    const email = emailInput.value;
    const password = passwordInput.value;

    // Basic email validation
    if (!validateEmail(email)) {
        handleInvalidInput(emailInput, signInUserMailErr);
        return;
    } else {
        handleValidInput(emailInput);
    }

    // Basic password validation
    if (!validatePassword(password)) {
        handleInvalidInput(passwordInput, signInUserPassErr);
        return;
    } else {
        handleValidInput(passwordInput);
    }

    const data = {
        email: email,
        password: password
    };

    try {
        const response = await fetch('https://gogreenserver-1.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        // Handle the response from the server
        
        window.open('../home.html','_self'); 
        // You can implement further actions based on the response
    } catch (error) {
        console.error('Error:', error);

        if (error instanceof SyntaxError) {
            const errorMessage = error.message;

            if (errorMessage.includes("Invalid email") || errorMessage.includes("Invalid password")) {
                alert("No user exists with this email or password.");
            } else {
                alert("An unexpected error occurred. Please try again later.");
            }
        } else {
            alert("An unexpected error occurred. Please try again later.");
        }
    }
}

function validateEmail(email) {
    // Add your email validation logic here
    // For example, you can use a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Add your password validation logic here
    // For example, require at least 8 characters
    return password.length >= 8;
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
