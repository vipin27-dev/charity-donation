document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post("/api/login", { email, password });
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        window.location.href = "/home";
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid email or password. Please check your credentials.");
      } else {
        alert("An error occurred during login. Please try again.");
      }
      console.error("Login error:", error);
    }
  });
});
