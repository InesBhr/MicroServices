const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

let authors = [
    {id: 1, name: "MUSSO"},
    {id: 2, name: "Marc"},
    {id: 3, name: "Mahmoud Darwich"}
];

app.get('/authors', async (req,res) => (
    res.json(authors)
));

app.get('/authors/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const author = authors.find(author => author.id === id)

    if (author){
        try {
            const authorDetails = {
                id: author.id,                 
                name: author.name, 
            };

            res.json(authorDetails);
        } catch(error){
            res.status(500).json({error: "Erreur lors de la récupération des détails de l'auteur"})
        }  
    }
});

app.listen(4000,()=>{
    console.log("Microservices démarré")
})