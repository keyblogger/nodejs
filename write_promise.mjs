//αρχείο write_promise.mjs
import *  as fs from 'fs/promises'

const fileName = "myBooks.txt";

console.log("Αρχή")
fs.writeFile(fileName, '{author: "Στάνισλαβ Λεμ", title: "Τα ημερολόγια των άστρων", εκδόσεις: "Ποταμός", έτος: 2021,}\n', { flag: 'a+' })
    .then(() => fs.readFile(fileName, 'utf-8'))
    .then((data) => {
        console.log("Δεδομένα:\n", data)
    })
    .catch(err => {
        console.error("Παρουσιάστηκε σφάλμα: ", err)
    });

console.log("Τέλος")