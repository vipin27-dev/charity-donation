document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. Please log in.");
    return;
  }
  axios
    .get("/api/charities/approved", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log("Response data:", response.data);
      const charities = response.data;
      const charityList = document.getElementById("approved-charities");
      charityList.innerHTML = "";

      if (Array.isArray(charities)) {
        charities.forEach((charity) => {
          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.textContent = charity.name;
          charityList.appendChild(listItem);
        });
      } else {
        console.error("Expected an array of charities, but got:", charities);
      }
    })
    .catch((error) => {
      console.error("Error fetching approved charities:", error);
    });
});
