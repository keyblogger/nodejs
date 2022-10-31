import express  from 'express'
import {BookList} from './book_list_async_await.mjs'

const app = express()

const bookList = new BookList()

/*bookList.addBookToFile({
    author: "Ιούλιος Βερν",
    title: "Ο γύρος του κόσμου σε 80 μέρες",
    εκδόσεις: "4π",
    έτος: "2010",
})*/

//app.get('/', (req, res) => res.send('Γειά σου express!'))
app.get('/books', async (req, res) => {
    res.write(htmlTopChunk)
    res.write("Η λίστα με τα βιβλία ...")
    res.write("<a href='addbookform/'>Προσθήκη νέου βιβλίου</a>")
    res.write("<ul>")
    await bookList.loadBooksFromFile()
    bookList.myBooks.books.forEach(book => {
        res.write(`<li>${book.author}, ${book.title}, ${book.εκδόσεις}, ${book.έτος}</li>`)
    })
    res.write("</ul>")
    res.write(htmlBottomChunk)
    res.end()
})

const PORT = 3000

app.listen(3000, () => console.log('Η εφαρμογή τρέχει στη θύρα ', PORT))

const htmlTopChunk = "<html>"
const htmlBottomChunk = "</html>"