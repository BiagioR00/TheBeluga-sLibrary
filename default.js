const dialog = document.querySelector("dialog");
const showButton = document.querySelector("#openModal");
const container = document.querySelector("#container");
const myLibrary = [];

function displayBooks() {
  container.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    const card = document.createElement("div");
    card.classList.add("card");
    const title = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    title.textContent = "Title: " + book.title;
    author.textContent = "Author: " + book.author;
    pages.textContent = "Number of pages: " + book.pages;
    read.textContent = "Read: " + (book.read ? "Yes" : "No");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteBook(i);
    });
    const readButton = document.createElement("button");
    readButton.textContent = "Read";
    readButton.addEventListener("click", () => {
      readBook(i);
    })
    card.append(title, author, pages, read, deleteButton, readButton);
    container.append(card);
  }
}


showButton.addEventListener("click", () => {
  dialog.showModal();
});

document.getElementById("bookForm").addEventListener("submit", function (event) {
    event.preventDefault();

    addBookToLibrary();

    dialog.close();
  });

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${
      this.read ? "read" : "not read"
    }`;
  };
}

function addBookToLibrary() {
  const title = document.getElementById("bookName").value;
  const author = document.getElementById("bookAuthor").value;
  const pages = document.getElementById("bookPages").value;
  const read = document.getElementById("bookRead").checked;
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  document.getElementById("bookForm").reset();

  displayBooks();
  console.log("Book added", newBook);
  dialog.close();
}

function deleteBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

function readBook(index) {
  if (myLibrary[index].read === true) {
    myLibrary[index].read = false;
  } else {
    myLibrary[index].read = true;
  }
  displayBooks();
}