let myLibrary = [];
const FORM = document.getElementById('book_form');
const ADD_BUTTON = document.getElementById('add_book_container');
const CANCEL_BUTTON = document.getElementById('cancel_button');
const DELETE_BUTTON = document.querySelector('.delete_button');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function showForm(e) {
    FORM.style.display = 'block';
    ADD_BUTTON.style.display = 'none';    
}

const createBookDivs = function(e) {
    const CONTAINER = document.getElementById('books_container');
    CONTAINER.innerHTML = '';    
    myLibrary.forEach(function(item, index) {
        const BDIV = document.createElement('DIV');
        BDIV.className = 'container'
        BDIV.setAttribute('data-array_position', index);
        BDIV.innerHTML =  `<span class="book_info_long"><b>Title:</b> ${item.title}</span>  <span class="book_info_long"><b>Author:</b> ${item.author}</span>  <span class="book_info_short"><b>Pages:</b> ${item.pages}</span>  <span class="book_info_short"><b class="book_read">Read:</b> ${item.read}</span>`;
        CONTAINER.append(BDIV);
        BDIV.insertAdjacentHTML('beforeend', '<span class = "delete_button">&timesb;</span>');
    });
    deleteBook();
}

function deleteBook() {
    document.querySelectorAll('.delete_button').forEach(function(but) {return but.addEventListener('click', function() {
        const arrayPosition = this.parentElement.dataset.array_position;
        myLibrary.splice(arrayPosition,1);
        console.log(myLibrary);
        createBookDivs();
    })});
}

function toggleRead() {}

function submitForm(e) {
    e.preventDefault();
    if (!FORM.book_title.value || !FORM.book_author.value) {
        alert('Please Complete The Form');
        return;
    }
    else if (isNaN(FORM.book_pages.value) || FORM.book_pages.value == 0) {
        alert('Page Amount Must be a Number');
        return;
    }
    myLibrary.unshift(new Book(FORM.book_title.value, FORM.book_author.value, +FORM.book_pages.value, FORM.book_read.value));
    FORM.reset();
    FORM.style.display = 'none';
    ADD_BUTTON.style.display = 'block';
    createBookDivs();
}

function cancelForm() {
    FORM.reset();
    FORM.style.display = 'none';
    ADD_BUTTON.style.display = 'block';
}

document.getElementById('add_book').addEventListener('click', showForm);
book_form.addEventListener('submit', submitForm);
CANCEL_BUTTON.addEventListener('click', cancelForm);
