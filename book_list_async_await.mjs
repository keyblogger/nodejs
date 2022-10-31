// Αρχείο book-list-async-await.mjs
import fs from 'fs/promises';

const fileName = "myBooks.txt";

export class BookList {
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

    async addBookToFile(newBook) {
        await this.loadBooksFromFile();
        let bookFound = this.isBookInList(newBook);
        if (!bookFound) {
            this.myBooks.books.push(newBook)
            try {
                let fd = await fs.open(fileName, 'w+')
                let writeOpResult = await fs.writeFile(fd, JSON.stringify(this.myBooks, null, 2))
                await fd.close()
            } catch (error) {
                throw error
            }
        }
    }

    async loadBooksFromFile() {
        try {
            let data = await fs.readFile(fileName, 'utf-8')
            if (data)
                this.myBooks = JSON.parse(await fs.readFile(fileName, 'utf-8'))
        } catch (error) {
            //αν απλά το αρχείο δεν υπάρχει είναι σαν να είναι άδεια η λίστα με τα βιβλία
            if (error.code=="ENOENT")
                return
            //αφήνουμε αυτόν που μας κάλεσε να γράψει τον κώδικα χειρισμού του σφάλματος
            throw error
        }
    }
};

const bookList = new BookList();

bookList.addBookToFile({
    συγγραφέας: "Ιούλιος Βερν",
    τίτλος: "Ο γύρος του κόσμου σε 80 μέρες",
    εκδόσεις: "4π",
    έτος: "2010",
})

bookList.addBookToFile({
    συγγραφέας: "Ιούλιος Βερν",
    τίτλος: "Ο γύρος του κόσμου σε 80 μέρες - 2nd",
    εκδόσεις: "4π",
    έτος: "2010",
})

await bookList.loadBooksFromFile()

console.log("book list:", bookList.myBooks)