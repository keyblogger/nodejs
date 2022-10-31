//αρχείο write_async_await.mjs
import *  as fs from 'fs/promises'

const fileName = "myBooks.txt";

try {
    await fs.writeFile(fileName, '{author: "Στάνισλαβ Λεμ", title: "Τα ημερολόγια των άστρων", εκδόσεις: "Ποταμός", έτος: 2021,}\n', { flag: 'a+' })
    const data = await fs.readFile('myBooks.txt', 'utf-8')
    console.log("Δεδομένα: ", data)
}
catch (err) {
    console.error("Παρουσιάστηκε σφάλμα: ", err)
}

console.log("Τέλος")