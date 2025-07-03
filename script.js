const userContainer = document.getElementById("userContainer");
const errorContainer = document.getElementById("errorContainer");
const errorMessage = document.getElementById("errorMessage");
const reloadBtn = document.getElementById("reloadBtn");

function fetchUsers() {
  userContainer.innerHTML = "";        // Clear old users
  errorContainer.style.display = "none"; // Hide error

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error("API responded with error");
      }
      return response.json();
    })
    .then((users) => {
      users.forEach((user) => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        card.innerHTML = `
          <h3>${user.name}</h3>
          <p>📧 ${user.email}</p>
          <p>🏠 ${user.address.street}, ${user.address.city}</p>
        `;
        userContainer.appendChild(card);
      });
    })
    .catch((error) => {
      errorMessage.textContent = "❌ Failed to load users. Please check your connection.";
      errorContainer.style.display = "block";
    });
}

// Reload button functionality
reloadBtn.addEventListener("click", fetchUsers);

// Initial load
fetchUsers();
