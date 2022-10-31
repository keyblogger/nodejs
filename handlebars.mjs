import express from 'express'
import { BookList } from './book_list_async_await.mjs';
import { engine } from 'express-handlebars';
import { check, validationResult } from 'express-validator'

let bookList = new BookList()

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.get('/books/', async (req, res) => {
    await bookList.loadBooksFromFile()
    res.render("home", { books: bookList.myBooks.books})
})

app.get('/addbookform', async (req, res) => {
    res.render("addbookform")
})
app.post('/doaddbook', 
    check("newBookTitle").isAlpha('el-GR').trim().withMessage("Πρέπει να είναι γραμμένο στα Ελληνικά")
        .isLength({ min: 5 }).withMessage("Τουλάχιστον πέντε γράμματα"),
    async (req, res) => {
    const newBook = {
        "title": req.body["newBookTitle"],
        "author": req.body["newBookAuthor"]
    }
    await bookList.addBookToFile(newBook)
    res.redirect("/books")

})
app.get('/books/', async (req, res) => {
    await bookList.loadBooksFromFile()
    res.render("home", { books: bookList.myBooks.books})
})

app.listen(3000, () => console.log('Η εφαρμογή τρέχει'))