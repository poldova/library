const name = document.querySelector('.name');
const author = document.querySelector('.author');
const pages = document.querySelector('.pages');
const read = document.querySelector('.read');
const buttons = document.querySelectorAll('button');
const sidebar = document.querySelector('.sidebar');
const display = document.querySelector('.display');
const myLibrary = [];

function Book(name, author, pages, read) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read === false ? '❌' : '✅';
}

Book.prototype.info = function () {
    return `${this.name} by ${this.author}, ${this.pages} pages, ${this.read}`
}

Book.prototype.toggleRead = function () {
    this.read = this.read === '❌' ? '✅' : '❌';
};

function addBook() {
    const inputName = name.value, inputAuthor = author.value, inputPages = pages.value, inputRead = read.checked;
    if (inputName === '' || inputAuthor === '') {
        return
    }
    const newBook = new Book(inputName, inputAuthor, inputPages, inputRead);
    myLibrary.push(newBook);
    
    name.value = ''; author.value = ''; pages.value = ''; read.checked = false;
    sidebar.classList.remove('pos');
    displayBook();
}

function delBook(index) {
    myLibrary.splice(index,1);
    displayBook();
}

function changeStatus(index) {
    myLibrary[index].toggleRead();
    
    displayBook();
}

function displayBook() {
    display.textContent = '';
    myLibrary.forEach((book,index) => {
        const row = document.createElement('div');
        const title = document.createElement('div');
        const writer = document.createElement('div');
        const numbers = document.createElement('div');
        const status = document.createElement('div');
        const del = document.createElement('button');

        title.textContent = book.name;
        writer.textContent = book.author;
        numbers.textContent = book.pages;
        status.textContent = book.read;
        del.textContent = 'Del';
        
        del.addEventListener('click', () => {
            delBook(index);
        });
        status.addEventListener('click', () => {
            changeStatus(index);
        });

        row.classList = 'row';
        title.classList = 'title';
        row.append(title, writer, numbers, status, del);
        display.appendChild(row);
    })
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        let target = e.target.classList.value;
        switch (target) {
            case 'add':
                sidebar.classList.add('pos');
                break;
            case 'cancel':
                sidebar.classList.remove('pos');
                break;
            case 'send':
                addBook();
                break;
        }
    })
})

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', false);

console.log(theHobbit.info())
