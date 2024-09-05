document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    // Fetch users and charities in parallel
    const [usersResponse, charitiesResponse] = await Promise.all([
      axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      }),
      axios.get("/api/admin/charities", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    ]);

    // Process users data
    if (usersResponse.status === 200) {
      const userList = document.getElementById("user-list");
      const users = usersResponse.data.users || []; // Default to empty array if data is missing
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.name} (${user.email})`;
        userList.appendChild(li);
      });
    } else {
      console.error("Failed to fetch users:", usersResponse.statusText);
      alert("Failed to load users.");
    }

    // Process charities data
    if (charitiesResponse.status === 200) {
      const charityList = document.getElementById("charity-list");
      const charities = charitiesResponse.data.charities || []; // Default to empty array if data is missing
      charities.forEach((charity) => {
        const li = document.createElement("li");
        li.textContent = `${charity.name} - ${charity.status}`;

        // Create approve button
        const approveButton = document.createElement("button");
        approveButton.textContent = "Approve";
        approveButton.onclick = () => approveCharity(charity.id);

        // Create decline button
        const declineButton = document.createElement("button");
        declineButton.textContent = "Decline";
        declineButton.onclick = () => declineCharity(charity.id);

        li.appendChild(approveButton);
        li.appendChild(declineButton);

        charityList.appendChild(li);
      });
    } else {
      console.error("Failed to fetch charities:", charitiesResponse.statusText);
      alert("Failed to load charities.");
    }
  } catch (error) {
    alert("An error occurred while loading data.");
    console.error("Admin error:", error);
  }
});

// Function to approve a charity
async function approveCharity(charityId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "/api/admin/charity/approve",
      { charityId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.status === 200) {
      alert("Charity approved successfully!");
      window.location.reload(); // Reload the page to see changes
    } else {
      console.error("Failed to approve charity:", response.statusText);
      alert("Failed to approve charity.");
    }
  } catch (error) {
    console.error("Error approving charity:", error);
    alert("An error occurred while approving the charity.");
  }
}

// Function to decline a charity
async function declineCharity(charityId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(`/api/admin/charities/${charityId}`, { // Ensure this matches the server route
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.status === 200) {
      alert("Charity declined successfully!");
      window.location.reload(); // Reload the page to see changes
    } else {
      console.error("Failed to decline charity:", response.statusText);
      alert("Failed to decline charity.");
    }
  } catch (error) {
    console.error("Error declining charity:", error);
    alert("An error occurred while declining the charity.");
  }
}
