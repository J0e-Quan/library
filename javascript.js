let library = []

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.id = crypto.randomUUID()
}

function addBook(title, author, pages, read,) {
    let book = new Book (title, author, pages, read,)
    library.push(book) 
    displayBook()
}

function displayBook() {
    let libraryGrid = document.querySelector(".library-grid")
    for (book of library) {
        let bookCard = document.createElement("div")
        bookCard.classList.add("card")

        let bookTitle = document.createElement("h3")
        bookTitle.textContent = book.title
        bookCard.appendChild(bookTitle)

        let bookAuthor = document.createElement("p")
        bookAuthor.textContent = "By: " + book.author
        bookCard.appendChild(bookAuthor)

        let bookPages = document.createElement("p")
        bookPages.textContent = book.pages + " pages"
        bookCard.appendChild(bookPages)

        let bookReadGrid = document.createElement("div")
        
        let bookRead = document.createElement("p")
        bookRead.textContent = "Has read: "
        bookReadGrid.appendChild(bookRead)
        
        let bookReadCheckbox = document.createElement("input")
        bookReadCheckbox.type="checkbox"
        if (book.read === true) {
            bookReadCheckbox.checked = true
        }
        bookReadGrid.appendChild(bookReadCheckbox)
        bookCard.appendChild(bookReadGrid)
        libraryGrid.appendChild(bookCard)
    }
}

let addBookBtn = document.querySelector(".new-book-submit")
addBookBtn.addEventListener('click', () =>{
    let title = document.querySelector("#title")
    let author = document.querySelector("#author")
    let pages = document.querySelector("#pages")
    let read = document.querySelector("#read")
    addBook(title.value, author.value, pages.value, read.checked)
})