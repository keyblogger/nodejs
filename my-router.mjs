import express from 'express'

const router = express.Router()

/*router.get("/about", function(req, res, next){
    console.log("Σχετικά με την εφαρμογή")
    res.send("Σχετικά με την εφαρμογή")
})*/

router.get("/about", (req, res) => {
    console.log("Σχετικά με την εφαρμογή")
    res.send("Σχετικά με την εφαρμογή")
})


export { router }