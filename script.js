// Declare Variables
window.addEventListener("load", loadLibraryFromLocalStorage);
const myLibrary = [];
const addBooksButton = document.querySelector(".add-books");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const gridCards = document.querySelector(".grid-cards");
const submitButton = document.querySelector(".submit-button");
const title = document.querySelector(".book-title");
const author = document.querySelector(".book-author");
const pages = document.querySelector(".book-pages");
const isRead = document.querySelector(".isRead-checkbox");
const errorMessage = document.querySelector(".error-message");

class Book {
  constructor(
    title = "Unknown",
    author = "Unknown",
    pages = "0",
    isRead = false
  ) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Add event listeners
addBooksButton.addEventListener("click", openModals);
overlay.addEventListener("click", removeModals); // Remove modal and overlay by clicking on the overlay
submitButton.addEventListener("click", addBooksToLibrary);

// Remove modal and overlay by pressing "Escape"
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    removeModals();
  }
});

function saveLibraryToLocalStorage() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function loadLibraryFromLocalStorage() {
  const storedLibrary = localStorage.getItem("myLibrary");
  if (storedLibrary) {
    myLibrary.push(...JSON.parse(storedLibrary));
    myLibrary.forEach((book) => createBookCard(book));
  }
}

function clearErrorMessage() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

function openModals() {
  clearErrorMessage();
  overlay.classList.add("active");
  modal.classList.add("active");
}

function removeModals() {
  clearErrorMessage();
  overlay.classList.remove("active");
  modal.classList.remove("active");
  title.value = "";
  author.value = "";
  pages.value = "";
  isRead.checked = false;
}

// Create book card
function createBookCard(book) {
  const bookCard = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const readBookBtn = document.createElement("button");
  const removeCardBtn = document.createElement("button");

  bookCard.classList.add("grid-card");
  readBookBtn.classList.add("read-btn");
  removeCardBtn.classList.add("remove-btn");

  readBookBtn.textContent = book.isRead ? "Read" : "Not Read";
  readBookBtn.classList.add(book.isRead ? "green-btn" : "red-btn");
  readBookBtn.onclick = () => toggleRead(book, readBookBtn);

  removeCardBtn.textContent = "Remove";
  removeCardBtn.onclick = () => removeBook(bookCard, book);

  title.textContent = `${book.title}`;
  author.textContent = `${book.author}`;
  pages.textContent = `${book.pages} pages`;
  removeCardBtn.textContent = "Remove";

  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(pages);
  bookCard.appendChild(readBookBtn);
  bookCard.appendChild(removeCardBtn);
  gridCards.appendChild(bookCard);
}

function removeBook(card, book) {
  const index = myLibrary.indexOf(book);
  if (index >= 0) {
    myLibrary.splice(index, 1);
    gridCards.removeChild(card);
    saveLibraryToLocalStorage();
  }
}

function toggleRead(book, button) {
  book.isRead = !book.isRead;
  button.textContent = book.isRead ? "Read" : "Not Read";
  button.classList.remove("green-btn", "red-btn");
  button.classList.add(book.isRead ? "green-btn" : "red-btn");
}

// Get value from inputs
function getInputsValue() {
  const titleValue = title.value;
  const authorValue = author.value;
  const pagesValue = pages.value;
  const checkBoxValue = isRead.checked;
  return new Book(titleValue, authorValue, pagesValue, checkBoxValue);
}

function addBooksToLibrary(e) {
  e.preventDefault();
  const newBook = getInputsValue();

  if (!newBook.title || !newBook.author || !newBook.pages) {
    errorMessage.textContent = "Please fill in all required fields.";
    errorMessage.style.display = "block";
    return;
  }

  // Check if a book with the same title already exists
  const isDuplicateTitle = myLibrary.some(
    (book) => book.title === newBook.title
  );

  if (!isDuplicateTitle) {
    myLibrary.push(newBook);
    createBookCard(newBook);
    removeModals();
    saveLibraryToLocalStorage();
  } else {
    errorMessage.textContent = "This book already exists in your library";
    errorMessage.style.display = "block";
  }
}
