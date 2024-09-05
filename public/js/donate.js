document.addEventListener("DOMContentLoaded", () => {
  const donationForm = document.getElementById("donation-form");

  // Get the token from localStorage
  const token = localStorage.getItem("token");

  // Check if the token exists, if not, show an error
  if (!token) {
    console.error("No token found. Please log in.");
    alert("You must log in to make a donation.");
    return;
  }

  // Populate charity dropdown
  axios
    .get("/api/charities/approved", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the request headers
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
      // Send donation request to the server
      const response = await axios.post(
        "/api/donate",
        { charityId, amount },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (response.status === 201) {
        // Set up Razorpay options
        const options = {
          key: response.data.keyId, // Your Razorpay key ID
          amount: response.data.amount, // Amount in paise
          currency: "INR",
          name: "Charity Platform",
          description: "Donation",
          image: "/your_logo.png", // Add your logo image
          order_id: response.data.orderId, // Order ID from server
          handler: () => {
            alert("Donation successful! Thank you for your contribution.");
            window.location.href = "/"; // Redirect to home page after successful payment
          },
          theme: {
            color: "#3399cc",
          },
        };

        // Initialize Razorpay and open the payment gateway
        const rzp1 = new Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      alert("Donation failed. Please try again.");
      console.error("Donation error:", error);
    }
  });
});
