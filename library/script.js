const myLibrary = [];

function Book(title, author, pages, isRead) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

function toggleBookRead(bookId) {
  const book = myLibrary.find((book) => book.id === bookId);

  if (book) {
    book.toggleRead();
  }
}

function addBookToLibrary(title, author, pages, isRead) {
  const newBook = new Book(title, author, pages, isRead);
  myLibrary.push(newBook);
}

function removeBook(bookId) {
  const index = myLibrary.findIndex((book) => book.id === bookId);

  if (index !== -1) {
    myLibrary.splice(index, 1);
  }
}

// DOM selections
const newBookButton = document.querySelector("#new-book-button");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");
const cancelButton = document.querySelector("#cancel-button");
const libraryContainer = document.querySelector("#library-container");


function displayBooks() {
  libraryContainer.replaceChildren();

  if (myLibrary.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Library is empty!";

    libraryContainer.appendChild(emptyMessage);
    return;
  }

  myLibrary.forEach((book, index) => {
    console.log(`Book ${index + 1}`);
    console.log(`ID: ${book.id}`);
    console.log(`Title: ${book.title}`);
    console.log(`Author: ${book.author}`);
    console.log(`Pages: ${book.pages}`);
    console.log(`Read: ${book.isRead ? "Yes" : "No"}`);
    console.log("--------------------");
  });
  
}


//Listeners
newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(bookForm);

  const title = formData.get("title").trim();
  const author = formData.get("author").trim();
  const pages = Number(formData.get("pages"));
  const isRead = formData.get("isRead") === "on";

  addBookToLibrary(title, author, pages, isRead);
  displayBooks();

  bookForm.reset();
  bookDialog.close();
});


cancelButton.addEventListener("click", () => {
  bookForm.reset();
  bookDialog.close();
});


displayBooks();