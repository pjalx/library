function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title}, ${this.pages} pages, ${this.read == true ? 'read' : 'not read yet'}`;
    };
}