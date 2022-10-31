// Αρχείο app.mjs
import http  from 'http';

http.createServer(function (req, res) {
  res.write('Hello!');  
  res.end(); 
}).listen(3000); // ο εξυπηρετητής αποκρίνεται στη θύρα 3000
