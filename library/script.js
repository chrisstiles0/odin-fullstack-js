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

function displayBooks() {

}

// DOM selections
const newBookButton = document.querySelector("#new-book-button");
const bookDialog = document.querySelector("#book-dialog");
const bookForm = document.querySelector("#book-form");


//Listeners
newBookButton.addEventListener("click", () => {
  bookDialog.showModal();
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Read form data.
  // Add the book.
  // Redisplay books.
});

