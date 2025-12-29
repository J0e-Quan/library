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

Book.prototype.toggleRead = function() {
    this.read = !this.read
    console.log(this.read)
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

function updatePlaceholderText() {
    if (library.length === 0) {
        let EmptyLibrary = document.createElement("h1")
        EmptyLibrary.classList.add("empty-library")
        EmptyLibrary.textContent = "This looks quite empty...\nAdd a book to get started."
        contentArea.appendChild(EmptyLibrary)
    } else if (library.length > 0 && document.querySelector(".empty-library") !== null) {
        let EmptyLibrary = document.querySelector(".empty-library")
        EmptyLibrary.remove()
    }
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
        bookReadCheckbox.dataset.id = book.id
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
    updatePlaceholderText()
    console.log("clearing form")
    let form = document.querySelector("form")
    form.reset()
}




let contentArea = document.querySelector(".content")
updatePlaceholderText() 
let addBookBtn = document.querySelector(".new-book-submit")
addBookBtn.addEventListener('click', () =>{
    let title = document.querySelector("#title")
    let author = document.querySelector("#author")
    let pages = document.querySelector("#pages")
    let read = document.querySelector("#read")
    let colour = document.querySelector("input[name=colour]:checked")
    let form = document.querySelector("form")
    if (title.value !== "" && author.value !== "" && pages.value !== "" && read.value !== "" && colour.value !== "") {
        addBook(title.value, author.value, pages.value, read.checked, colour.value)
    }
    form.reset()
})

contentArea.addEventListener('click', (event) => {
    if (event.target.classList.contains("delete")) {
        let targetId = event.target.dataset.id
        library = library.filter(book => book.id !== targetId)
        displayBook()
    } else if (event.target.type === "checkbox") {
        let targetId = event.target.dataset.id
        let targetBook = library.find(book => book.id === targetId)
        targetBook.toggleRead()
    }
})