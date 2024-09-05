document.addEventListener("DOMContentLoaded", () => {
  const donationForm = document.getElementById("donation-form");

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. Please log in.");
    alert("You must log in to make a donation.");
    return;
  }
  // Populate charity dropdown
  axios
    .get("/api/charities/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const charities = response.data;
      const charitySelect = document.getElementById("charity");

      charities.forEach((charity) => {
        const option = document.createElement("option");
        option.value = charity.id;
        option.textContent = charity.name;
        charitySelect.appendChild(option);
      });
    })
    .catch((error) => {
      console.error("Error fetching charities:", error);
      alert("Failed to load charities. Please try again.");
    });

  // Handle form submission
  donationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const charityId = document.getElementById("charity").value;
    const amount = document.getElementById("amount").value;

    try {
      const response = await axios.post(
        "/api/donate",
        { charityId, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        const options = {
          key: response.data.keyId,
          amount: response.data.amount,
          currency: "INR",
          name: "Charity Platform",
          description: "Donation",
          order_id: response.data.orderId,
          handler: () => {
            alert("Donation successful! Thank you for your contribution.");
            window.location.href = "/";
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      alert("Donation failed. Please try again.");
      console.error("Donation error:", error);
    }
  });
});
