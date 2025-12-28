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

        let bookRead = document.createElement("div")
        bookRead.classList.add("book-read")
        
        let bookReadText = document.createElement("p")
        bookReadText.textContent = "Has read: "
        bookRead.appendChild(bookReadText)
        
        let bookReadCheckbox = document.createElement("input")
        bookReadCheckbox.type="checkbox"
        if (book.read === true) {
            bookReadCheckbox.checked = true
        }
        bookRead.appendChild(bookReadCheckbox)
        bookCard.appendChild(bookRead)
        libraryGrid.appendChild(bookCard)
    }
}

let addBookBtn = document.querySelector(".new-book-submit")
addBookBtn.addEventListener('click', () =>{
    let title = document.querySelector("#title")
    let author = document.querySelector("#author")
    let pages = document.querySelector("#pages")
    let read = document.querySelector("#read")
    if (title.value !== "" && author.value !== "" && pages.value !== "" && read.value !== "") {
        addBook(title.value, author.value, pages.value, read.checked)
    }
})