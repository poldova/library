class Book {
    constructor(name, author, pages, read) {
      this.name = name;
      this.author = author;
      this.pages = pages;
      this.read = read ? "Read" : "Unread";
    }
  
    info() {
      return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`;
    }
  
    toggleRead() {
      this.read = this.read === "Unread" ? "Read" : "Unread";
    }
  }
  
  class Library {
    constructor() {
      this.myLibrary = [];
      this.name = document.querySelector(".name");
      this.author = document.querySelector(".author");
      this.pages = document.querySelector(".pages");
      this.read = document.querySelector(".read");
      this.buttons = document.querySelectorAll("button");
      this.sidebar = document.querySelector(".sidebar");
      this.display = document.querySelector(".display");
      this.init();
      console.log(this.sidebar);
    }
  
    init() {
      this.buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          let target = e.target.classList.value;
          switch (target) {
            case "add":
              this.sidebar.classList.add("pos");
              break;
            case "cancel":
              this.sidebar.classList.remove("pos");
              break;
            case "send":
              this.addBook();
              break;
          }
        });
      });
    }
  
    addBook() {
      const inputName = this.name.value,
        inputAuthor = this.author.value,
        inputPages = this.pages.value,
        inputRead = this.read.checked;
      if (inputName === "" || inputAuthor === "" || inputPages === "") {
        alert("Please fill in all the fields.");
        return;
      }
      const newBook = new Book(inputName, inputAuthor, inputPages, inputRead);
      this.myLibrary.push(newBook);
      this.name.value = "";
      this.author.value = "";
      this.pages.value = "";
      this.read.checked = false;
      this.sidebar.classList.remove("pos");
      this.displayBook();
    }
  
    delBook(index) {
      this.myLibrary.splice(index, 1);
      this.displayBook();
    }
  
    changeStatus(index) {
      this.myLibrary[index].toggleRead();
      this.displayBook();
    }
  
    displayBook() {
      this.display.textContent = "";
      this.myLibrary.forEach((book, index) => {
        const row = document.createElement("div");
        const title = document.createElement("div");
        const writer = document.createElement("div");
        const numbers = document.createElement("div");
        const status = document.createElement("div");
        const del = document.createElement("div");
  
        title.textContent = book.name;
        writer.textContent = book.author;
        numbers.textContent = book.pages;
        status.textContent = book.read;
        del.textContent = "✖";
  
        del.addEventListener("click", () => {
          this.delBook(index);
        });
        status.addEventListener("click", () => {
          this.changeStatus(index);
        });
  
        row.classList = "row";
        title.classList = "title";
        row.append(title, writer, numbers, status, del);
        this.display.appendChild(row);
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    new Library();
  });
  