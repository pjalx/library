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
    document.querySelectorAll('.book_read').forEach(function(tog) {
        return tog.removeEventListener('click', toggleRead, false);
    });
    CONTAINER.innerHTML = '';    
    myLibrary.forEach(function(item, index) {
        const BDIV = document.createElement('DIV');
        BDIV.className = 'container'
        BDIV.setAttribute('data-array_position', index);
        BDIV.innerHTML =  `<span class="book_info_long"><b>Title:</b> ${item.title}</span>  <span class="book_info_long"><b>Author:</b> ${item.author}</span>  <span class="book_info_short"><b>Pages:</b> ${item.pages}</span>  <span class="book_info_short"><b class="book_read">Read:</b> ${item.read}</span>`;
        BDIV.insertAdjacentHTML('beforeend', '<span class = "delete_button">&timesb;</span>');
        CONTAINER.append(BDIV);

        document.querySelectorAll('.book_read').forEach(function(tog) {
            return tog.addEventListener('click', toggleRead, false);
        });
    });
    
    function toggleRead(e) {
        if (myLibrary[e.target.parentElement.parentElement.dataset.array_position].read == 'true') {
            e.target.nextSibling.textContent = ` false`;
            myLibrary[e.target.parentElement.parentElement.dataset.array_position].read = 'false';
        }else {
            e.target.nextSibling.textContent = ` true`;
            myLibrary[e.target.parentElement.parentElement.dataset.array_position].read = 'true';
        }
        //console.log(e.target.parentElement.parentElement.dataset.array_position);
        //myLibrary[document.querySelector('.book_read').parentElement.parentElement.dataset.array_position].read
    }

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
