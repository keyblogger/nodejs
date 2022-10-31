import express  from 'express'
const app = express()

const myMiddleware1 = (req, res, next) => {
    console.log('MW-1')
    next()
}

const myMiddleware2 = (req, res, next) => {
    console.log('MW-2')
    //res.send("Ok!")
    next()
}

const myMiddleware3 = (req, res, next) => {
    console.log('MW-3')
    res.send("Ok-2nd!")
}

/*app.use(myMiddleware2)
app.use(myMiddleware1)
app.use(myMiddleware3)

const pipeline = [myMiddleware1, myMiddleware2, myMiddleware3] 
app.use(pipeline)*/

//app.get("/path1", myMiddleware2)
//app.get("/", myMiddleware1)
//app.use(myMiddleware3)

app.route("/book")
    .all((req, res) => {
        // το 'all' εκτελείται σε κάθε περίπτωση
    })
    .get((req, res) => {
        console.log('Επιστρέφει ένα βιβλίο')
        res.send('Επιστρέφει ένα βιβλίο')
    })
    .post((req, res) => {
        res.send('Προσθήκη ενός βιβλίου')
    })
    .put((req, res) => {
        res.send('Ενημέρωση του βιβλίου')
    })

app.listen(3000, () => console.log('Η εφαρμογή τρέχει'))
