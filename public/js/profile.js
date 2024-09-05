document.addEventListener("DOMContentLoaded", () => {
    const profileForm = document.getElementById("profile-form");
  
    // Get the token from localStorage
    const token = localStorage.getItem("token");
  
    if (!token) {
      console.error("No token found. Please log in.");
      alert("You must log in to manage your profile.");
      window.location.href = "/login";
      return;
    }
  
    // Fetch user profile data
    axios
      .get("/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
        },
      })
      .then((response) => {
        const user = response.data;
        document.getElementById("name").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("phno").value = user.phno;
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
        alert("Failed to load profile. Please try again.");
      });
  
    // Handle form submission
    profileForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phno = document.getElementById("phno").value;
  
      try {
        const response = await axios.put(
          "/api/user/profile",
          { name, email, phno },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in request headers
            },
          }
        );
  
        if (response.status === 200) {
          alert("Profile updated successfully!");
          console.log("Redirecting to home...");
          window.location.href = "/home";
        }
      } catch (error) {
        alert("Profile update failed. Please try again.");
        console.error("Profile update error:", error);
      }
    });
  });
  