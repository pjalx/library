let myLibrary = JSON.parse(localStorage.getItem('lsLibrary')) || [];
const FORM = document.getElementById('book_form');
const ADD_BUTTON = document.getElementById('add_book_container');
const CANCEL_BUTTON = document.getElementById('cancel_button');

function showStore() {
    if (JSON.parse(localStorage.getItem('lsLibrary')) == null || myLibrary.length == 0) {
        console.log('no storage initially');
        return;
    } else if (JSON.parse(localStorage.getItem('lsLibrary')).length > 0) {
        createBookDivs();
        return;
    }
}

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

function createBookDivs(e) {
    const CONTAINER = document.getElementById('books_container');
    document.querySelectorAll('.book_read').forEach(function(tog) {
        return tog.removeEventListener('click', toggleRead, false);
    });
    CONTAINER.innerHTML = '';    
    myLibrary.forEach(function(item, index) {
        const BDIV = document.createElement('DIV');
        BDIV.className = 'container'
        BDIV.setAttribute('data-array_position', index);
        BDIV.innerHTML =  `<span class="book_info_long"><b>Title:</b> ${item.title}</span>  <span class="book_info_long"><b>Author:</b> ${item.author}</span>  <span class="book_info_short"><b>Pages:</b> ${item.pages}</span>  <span class="book_info_short"><b class="ops_button book_read_status">Read: </b><span class="book_read ${item.read == 'False' ? 'False': 'True'}"> ${item.read}</span></span>`;
        BDIV.insertAdjacentHTML('beforeend', '<span class = "delete_button ops_button">&timesb;</span>');
        CONTAINER.append(BDIV);

        document.querySelectorAll('.book_read_status').forEach(function(tog) {
            return tog.addEventListener('click', toggleRead, false);
        });
    });
    
    function toggleRead(e) {
        if (myLibrary[e.target.parentElement.parentElement.dataset.array_position].read == 'True') {
            e.target.nextElementSibling.textContent = `False`;
            e.target.nextSibling.classList.remove('True');
            e.target.nextSibling.classList.add('False');
            myLibrary[e.target.parentElement.parentElement.dataset.array_position].read = 'False';
        }else {
            e.target.nextElementSibling.textContent = `True`;
            e.target.nextSibling.classList.remove('False');
            e.target.nextSibling.classList.add('True');
            myLibrary[e.target.parentElement.parentElement.dataset.array_position].read = 'True';
        }
        localStorage.setItem('lsLibrary', JSON.stringify(myLibrary));
    }

    deleteBook();
}

function deleteBook() {
    document.querySelectorAll('.delete_button').forEach(function(but) {return but.addEventListener('click', function() {
        const arrayPosition = this.parentElement.dataset.array_position;
        myLibrary.splice(arrayPosition,1);
        localStorage.setItem('lsLibrary', JSON.stringify(myLibrary));
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
    localStorage.setItem('lsLibrary', JSON.stringify(myLibrary));
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
window.addEventListener('DOMContentLoaded', showStore);
