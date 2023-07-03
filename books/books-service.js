const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const axios = require('axios');
app.use(bodyParser.json());
import  EventBus  from "./eventBus.js";


let books = [
    {id: 1, title: "livre 1", authorId: 1, categoryId: 1},
    {id: 2, title: "livre 2", authorId: 2, categoryId: 2},
    {id: 3, title: "livre 3", authorId: 3, categoryId: 3},
    {id: 4, title: "livre 4", authorId: 2, categoryId: 2},
    {id: 5, title: "livre 5", authorId: 1, categoryId: 1},
];

app.get('/books', async (req,res) => (
    res.json(books)
));

app.get('/books/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(book => book.id === id)
    if(book){
        try {
            const authorResponse = await axios.get(`http://author-service:4000/authors/${book.authorId}`);
            const categoryResponse = await axios.get(`http://categories-service:5000/categories/${book.categoryId}`);
            const author = authorResponse.data;
            const category = categoryResponse.data;
            const bookDetails = {
                id: book.id,                 
                title: book.title, 
                author: author.name, 
                category: category.name
            };

            res.json(bookDetails);
        } catch(error){
            console.log(error);
            res.status(500).json({error: 'Erreur lors de la récupération des détails du livre'})
        }  
    }
});

EventBus.subscriber("BookCreated", (book) => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book)
    };
  
    fetch("http://localhost:3000/books", options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Book created in the microservice Book :", data);
      })
      .catch((error) => {
        console.error("Error while creating the Book :", error);
      });
  });

app.listen(3000,()=>{
    console.log("Microservices démarré")
})