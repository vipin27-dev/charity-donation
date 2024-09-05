document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-charity-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const mission = document.getElementById("mission").value;
    const goals = document.getElementById("goals").value;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "/api/charity/register",
        {
          name,
          mission,
          goals,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Charity created successfully! Waiting for admin approval.");
        window.location.href = "/home";
      }
    } catch (error) {
      alert("Failed to create charity. Please try again.");
      console.error("Create charity error:", error);
    }
  });
});
