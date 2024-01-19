// Declare Variables
const addBooksButton = document.querySelector(".add-books");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

// Add event listeners
addBooksButton.addEventListener("click", addBooks);
overlay.addEventListener("click", removeOverlay); // Remove modal and overlay by clicking on the overlay

// Remove modal and overlay by pressing "Escape"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    removeOverlay();
  }
});

function addBooks() {
  overlay.classList.add("active");
  modal.classList.add("active");
}

function removeOverlay() {
  overlay.classList.remove("active");
  modal.classList.remove("active");
}
