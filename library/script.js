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

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    bookCard.dataset.bookId = book.id;

    const title = document.createElement("h2");
    title.textContent = book.title;

    const author = document.createElement("p");
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${book.pages}`;

    const readStatus = document.createElement("p");
    readStatus.textContent = book.isRead ? "Status: Read" : "Status: Not read";

    const toggleReadButton = document.createElement("button");
    toggleReadButton.type = "button";
    toggleReadButton.textContent = book.isRead
      ? "Mark as unread"
      : "Mark as read";

    toggleReadButton.addEventListener("click", () => {
      const bookId = bookCard.dataset.bookId;

      toggleBookRead(bookId);
      displayBooks();
    });

    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.textContent = "Remove book";

    removeButton.addEventListener("click", () => {
      const bookId = bookCard.dataset.bookId;

      removeBook(bookId);
      displayBooks();
    });

    bookCard.append(
      title,
      author,
      pages,
      readStatus,
      toggleReadButton,
      removeButton
    );

    libraryContainer.appendChild(bookCard);
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