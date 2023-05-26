const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

let categories = [
    {id: 1, name: "Roman"},
    {id: 2, name: "Thriller"},
    {id: 3, name: "Polar"}
];

app.get('/categories', async (req,res) => (
    res.json(categories)
));

app.get('/categories/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const categorie = categories.find(categorie => categorie.id === id)

    if (categorie){
        try {
            const categorieDetails = {
                id: categorie.id,                 
                name: categorie.name, 
            };

            res.json(categorieDetails);
        } catch(error){
            res.status(500).json({error: "Erreur lors de la récupération des détails de la catégorie"})
        }  
    }
});

app.listen(5000,()=>{
    console.log("Microservices démarré")
})