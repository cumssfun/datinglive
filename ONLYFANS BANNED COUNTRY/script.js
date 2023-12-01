document.addEventListener('DOMContentLoaded', function() {
  let memberCount = 5101; // Initial member count
  const onlineMembersElement = document.getElementById('online-members');

  setInterval(function() {
    memberCount += 7; // Increase the member count
    onlineMembersElement.textContent = memberCount.toLocaleString() + ' Member Online';
  }, 1000); // Update every 1 second
});

function display_access_denied_error() {
  document.body.innerHTML
    = '<div id="access-denied-error">'
    + '<div class="middle-center">'
    + '<span class="pulsate-bck">'
    + '<i class="bi bi-exclamation-diamond-fill"></i>'
    + 'Access Denied'
    + '</span>'
    + '</div>'
    + '</div>';
}

function block_blacklist_countries() {
  // Blacklist countries
  const blacklist_countries = [
    "ID", // Indonesia
    "IN", // India
  ];

  function get_country_code(api_url) {
    fetch(api_url, { method: 'GET' })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Getting IP info as JSON
      })
      .then(result => {
        if (blacklist_countries.includes(result.country)) { // If my IP country code is in the blacklist
          display_access_denied_error(); // Access denied error
        }
      })
      .catch(error => {
        console.log('Error:', error);
        // Handle errors (e.g., network issues) here, such as showing a different error message
      });
  }

  // Getting country code from a third-party API
  get_country_code("https://get.geojs.io/v1/ip/country.json");
}

block_blacklist_countries(); // Block blacklist countries
