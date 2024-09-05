document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            // Send login request to the backend
            const response = await axios.post('/api/login', { email, password });

            // If login is successful
            if (response.status === 200) {
                // Save the token in localStorage
                const token = response.data.token;  // Assuming the token is returned in response.data.token
                localStorage.setItem('token', token);

                // Redirect to the home page
                window.location.href = '/home';
            } else {
                // Handle unexpected status codes
                alert("Login failed. Please try again.");
            }
        } catch (error) {
            // Handle different error scenarios
            if (error.response && error.response.status === 401) {
                alert("Invalid email or password. Please check your credentials.");
            } else {
                alert("An error occurred during login. Please try again.");
            }
            console.error("Login error:", error);
        }
    });
});
