document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get("/history");

    if (response.status === 200) {
      const historyTableBody = document.querySelector("tbody");

      response.data.donations.forEach((donation) => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${donation.charityName}</td>
                    <td>${donation.amount}</td>
                    <td>${new Date(donation.date).toLocaleDateString()}</td>
                    <td>${donation.status}</td>
                `;

        historyTableBody.appendChild(row);
      });
    }
  } catch (error) {
    alert("Failed to load donation history.");
    console.error("History error:", error);
  }
});
