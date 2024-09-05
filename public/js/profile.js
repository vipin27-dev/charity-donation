document.addEventListener("DOMContentLoaded", () => {
  const profileForm = document.getElementById("profile-form");
  const viewHistoryButton = document.getElementById("view-history");

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
        Authorization: `Bearer ${token}`,
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
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        window.location.href = "/home";
      }
    } catch (error) {
      alert("Profile update failed. Please try again.");
      console.error("Profile update error:", error);
    }
  });

  // Handle view history button click
  viewHistoryButton.addEventListener("click", async () => {
    try {
      const response = await axios.get("/api/donations/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const donations = response.data;
      if (donations.length > 0) {
        let historyHtml = "<h3>Donation History</h3><ul>";
        donations.forEach((donation) => {
          historyHtml += `<li>Charity ID: ${donation.charityId}, Amount: ${
            donation.amount
          }, Date: ${new Date(donation.createdAt).toLocaleDateString()}</li>`;
        });
        historyHtml += "</ul>";
        document.body.insertAdjacentHTML("beforeend", historyHtml);
      } else {
        alert("No donation history found.");
      }
    } catch (error) {
      console.error("Error fetching donation history:", error);
      alert("Failed to load donation history. Please try again.");
    }
  });
});
