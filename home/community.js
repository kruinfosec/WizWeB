document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.community-form');
    const communityList = document.getElementById('community-list');
  
    // Handle form submission
    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // Prevent form from refreshing the page
  
      const formData = new FormData(form); // Collect form data (including file if uploaded)
  
      // Send form data to the server
      try {
        const response = await fetch('http://localhost:3000/create-community', {
          method: 'POST',
          body: formData
        });
  
        if (response.ok) {
          const data = await response.json();
          alert('Community created successfully!');
          console.log('Community created:', data);
  
          // Optionally, display the new community in the community list
          const newCommunity = document.createElement('div');
          newCommunity.classList.add('community-item');
          newCommunity.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.description}</p>
            <p><strong>Category:</strong> ${data.category}</p>
          `;
          communityList.appendChild(newCommunity);
  
          // Reset the form
          form.reset();
        } else {
          const errorData = await response.json();
          alert('Error: ' + errorData.message);
          console.error('Error creating community:', errorData);
        }
      } catch (error) {
        console.error('Error creating community:', error);
        alert('There was an error creating the community.');
      }
    });
  
    // Fetch the list of communities on page load
    async function fetchCommunities() {
      try {
        const response = await fetch('http://localhost:3000/get-communities');
        if (response.ok) {
          const communities = await response.json();
          communityList.innerHTML = ''; // Clear the existing list
          communities.forEach(community => {
            const communityItem = document.createElement('div');
            communityItem.classList.add('community-item');
            communityItem.innerHTML = `
              <h3>${community.name}</h3>
              <p>${community.description}</p>
              <p><strong>Category:</strong> ${community.category}</p>
            `;
            communityList.appendChild(communityItem);
          });
        } else {
          console.error('Failed to fetch communities');
        }
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    }
  
    // Fetch the communities on page load
    fetchCommunities();
  
});
