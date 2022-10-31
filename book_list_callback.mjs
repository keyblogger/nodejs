// Αρχείο book-list-callback.mjs
import fs from 'fs';

const fileName = "myBooks.txt";

class BookList {
    myBooks = { books: [] }

    isBookInList(book) {
        let bookFound = this.myBooks.books.find(item => (
            item.συγγραφέας === book.συγγραφέας &&
            item.τίτλος === book.τίτλος &&
            item.εκδόσεις === book.εκδόσεις &&
            item.έτος === book.έτος
        ));
        if (bookFound)
            return true;
        else
            return false;
    }

    addBookToFile(newBook, callback) {
        this.loadBooksFromFile((err) => {
            if (err)
                callback(err)
            else {
                //η getBooksFromFile έχει τελειώσει και φορτώθηκαν τα βιβλία στη myBooks
                if (!this.isBookInList(newBook)) {
                    //το βιβλίο δε βρέθηκε στη λίστα, οπότε το βάζουμε
                    this.myBooks.books.push(newBook);
                    //αποθηκεύουμε τη λίστα
                    fs.writeFile(fileName, JSON.stringify(this.myBooks, null, 2), {flag: 'w+'}, (err) => {
                        if (err)
                            callback(err)
                    })
                }
            }
            callback(null)
        });
    }

    loadBooksFromFile(callback) {
        fs.readFile(fileName, 'utf-8', (err, data) => {
            // https://nodejs.org/api/errors.html#common-system-errors
            if (err)
                if (err.code === "ENOENT")
                    //δεν υπάρχει το αρχείο - θα χρησιμοποιηθεί η myBooks όπως είναι (άδεια)    
                    callback(null);
                else
                    callback(err.code)
            else {
                if (data.trim() === "")
                    //αν το αρχείο είναι άδειο, θα χρησιμοποιηθεί η myBooks όπως είναι (άδεια)
                    callback(null)
                else {
                    //το αρχείο άνοιξε και δεν είναι άδειο
                    this.myBooks = JSON.parse(data.trim())
                    callback(null);
                }
            }
        });
    }
};

const bookList = new BookList();

bookList.addBookToFile({
    author: "Ιούλιος Βερν",
    title: "Ο γύρος του κόσμου σε 80 μέρες",
    εκδόσεις: "4π",
    έτος: "2010",
})