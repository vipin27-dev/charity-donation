document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phno = document.getElementById("phno").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await axios.post("/api/signup", {
        name,
        phno,
        email,
        password,
      });
      if (response.status === 201) {
        window.location.href = "/login";
      }
    } catch (error) {
      alert("Signup failed. Please try again.");
      console.error("Signup error:", error);
    }
  });
});
