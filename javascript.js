let library = []

function Book(title, author, pages, read, colour) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.colour = colour
    this.isWhiteText = false
    this.id = crypto.randomUUID()
}

function addBook(title, author, pages, read, colour) {
    let book = new Book (title, author, pages, read, colour)
    library.push(book) 
    displayBook()
}

function determineBookColour(colour) {
    for (book of library) {
        if (colour === "#0059ff" || colour === "#e30000" || colour === "#ae00ff" || colour === "#875801" || colour === "#ff00d9") {
            book.isWhiteText = true
        } else {
            book.isWhiteText = false
        }
    }
}

function clearForm(title, author, pages, read, colour) {
    title.value = ""
    author.value = ""
    pages.value = ""
    read.checked = false
    colour.checked = false
}

Book.prototype.toggleRead = function() {
    book.read = !book.read
}

function displayBook() {
    let libraryGrid = document.querySelector(".library-grid")

    //This removes all existing books
    libraryGrid.replaceChildren()

    for (book of library) {
        let bookCard = document.createElement("div")
        bookCard.classList.add("card")
        bookCard.style.backgroundColor = book.colour

        let bookTitle = document.createElement("h3")
        bookTitle.textContent = book.title
        bookTitle.classList.add("title")
        bookCard.appendChild(bookTitle)

        let bookAuthor = document.createElement("p")
        bookAuthor.textContent = "By: " + book.author
        bookAuthor.classList.add("author")
        bookCard.appendChild(bookAuthor)

        let bookPages = document.createElement("p")
        if (book.pages === 1) {
            bookPages.textContent = book.pages + "page"
        } else {
            bookPages.textContent = book.pages + " pages"
        }
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

        let bookDelete = document.createElement("button")
        bookDelete.type = "button"
        bookDelete.classList.add("delete")
        bookDelete.dataset.id = book.id
        bookDelete.textContent = "Delete book"
        bookCard.appendChild(bookDelete)

        determineBookColour(book.colour)
        if (book.isWhiteText === true) {
            bookCard.classList.add("white-text")
        }

        libraryGrid.appendChild(bookCard)
    }
}

let addBookBtn = document.querySelector(".new-book-submit")
addBookBtn.addEventListener('click', () =>{
    let title = document.querySelector("#title")
    let author = document.querySelector("#author")
    let pages = document.querySelector("#pages")
    let read = document.querySelector("#read")
    let colour = document.querySelector("input[name=colour]:checked")
    if (title.value !== "" && author.value !== "" && pages.value !== "" && read.value !== "" && colour.value !== "") {
        addBook(title.value, author.value, pages.value, read.checked, colour.value)
    }
    clearForm(title, author, pages, read, colour)
})

