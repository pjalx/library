let myLibrary = [];
const createBookDiv = function(e) {
    const CONTAINER = document.getElementById('main_container');
    const BDIV = document.createElement('DIV');
    BDIV.className = 'container'
    BDIV.textContent = 'Another One.';
    BDIV.insertAdjacentHTML('beforeend', '<span>&timesb;</span>');
    CONTAINER.append(BDIV);
}

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /*this.info = function() {
        return `${this.title}, ${this.pages} pages, ${this.read == true ? 'read' : 'not read yet'}`;
    };*/
}

Book.prototype.info = function() {
    return `${this.title}, ${this.pages} pages, ${this.read == true ? 'read' : 'not read yet'}`;
};

function showForm(e) {
    const form = document.getElementById('book_form');
    const button = document.getElementById('add_book_container');
    form.style.display = 'block';
    button.style.display = 'none';    
}

function submitForm(e) {
    const form = document.getElementById('book_form');
    const button = document.getElementById('add_book_container');
    e.preventDefault();
    if (!form.book_title.value || !form.book_author.value) {
        alert('Please Complete The Form');
        return;
    }
    else if (isNaN(form.book_pages.value) || form.book_pages.value == 0) {
        alert('Page Amount Must be a Number');
        return;
    }
    myLibrary.push(new Book(form.book_title.value, form.book_author.value, +form.book_pages.value, form.book_read.value));
    form.reset();
    form.style.display = 'none';
    button.style.display = 'block';
    createBookDiv();    
}

document.getElementById('add_book').addEventListener('click', showForm);
book_form.addEventListener('submit', submitForm);