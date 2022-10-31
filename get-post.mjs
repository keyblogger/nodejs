import express from 'express'
import { router } from './my-router.mjs'

const app = express()

app.use(express.static('/public'))

app.get('/book', function (req, res, next) {
    for (const key in req.query) {
        console.log(key, ":", req.query[key])
        next()
    }
    console.log("req.params don't exist:", req.params)
    //res.status(404)
    res.send("got a book.")
})

app.get('/book/title/:title/author/:author', function (req, res, next) {
    console.log(req.params)
    res.send("got a book.")
})

app.use(express.urlencoded({ extended: false }))
app.post('/', (req, res) => {
    console.log("request body:", req.body)
    res.send("post ok")
})

app.use("/book", router)

app.listen(3000, () => console.log('Ready'))