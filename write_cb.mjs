//αρχείο write_cb.mjs
import fs from 'fs'

const fileName = "myBooks.txt";

console.log("Αρχή")
fs.open(fileName, 'a+', (err, fd) => {
    if (err){
        console.error("Παρουσιάστηκε σφάλμα: ", err.code)
        return
    }
    else {
        fs.write(fd, '{ title: "Τα ημερολόγια των άστρων", author: "Στάνισλαβ Λεμ"}\n', (err, written, string) => {
            fs.close(fd)
            if (err) {
                console.error("Παρουσιάστηκε σφάλμα: ", err.code)
                return
            }
            else
                fs.readFile(fileName, 'utf-8', (err, data) => {
                    if (err){
                        console.error("Παρουσιάστηκε σφάλμα: ", err.code)
                        return
                    }
                    else
                        console.log('Δεδομένα: ', data.trim());
                });
        })
    }
})
console.log("Τέλος")