document.addEventListener('DOMContentLoaded', () => {
    // Get the token from local storage or wherever it's stored
    const token = localStorage.getItem('token');

    // Check if token is available
    if (!token) {
        console.error('No token found. Please log in.');
        return;
    }

    axios.get('/api/charities/approved', {
        headers: {
            'Authorization': `Bearer ${token}` // Include token in the Authorization header
        }
    })
    .then(response => {
        // Log the response data for debugging
        console.log('Response data:', response.data);

        const charities = response.data; // No need for .charities if data is an array
        const charityList = document.getElementById('approved-charities');

        // Clear any existing list items
        charityList.innerHTML = '';

        if (Array.isArray(charities)) {
            charities.forEach(charity => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = charity.name;
                charityList.appendChild(listItem);
            });
        } else {
            console.error('Expected an array of charities, but got:', charities);
        }
    })
    .catch(error => {
        console.error('Error fetching approved charities:', error);
    });
});
