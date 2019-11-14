let myLibrary = [];
const createBookDiv = function(e) {
    const CONTAINER = document.getElementById('main-container');
    const BDIV = document.createElement('DIV');
    BDIV.className = 'container'
    BDIV.textContent = 'Another One.';
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

//document.querySelector('h1').addEventListener('click', createBookDiv)