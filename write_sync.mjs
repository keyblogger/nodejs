//αρχείο write_sync.mjs
import *  as fs from 'fs'

const fileName = "myBooks.txt";

console.log("Αρχή")
try {
    const fd = fs.openSync(fileName, 'a+')
    fs.writeSync(fd, '{author: "Στάνισλαβ Λεμ", title: "Τα ημερολόγια των άστρων", εκδόσεις: "Ποταμός", έτος: 2021,}\n');
    fs.closeSync(fd);
}
catch (err) {
    if (err.code == 'EACCES')
        console.error("Δεν έχω πρόσβαση")
    else
        console.error("Παρουσιάστηκε σφάλμα: ", err.code)
}
//Ανάγνωση των περιεχομένων του αρχείου
try {
    const data = fs.readFileSync(fileName, 'utf-8');
    console.log('Δεδομένα: ', data.trim());
}
catch (err) {
    console.error("Παρουσιάστηκε σφάλμα: ", err)
}
console.log("Τέλος")