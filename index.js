import express from "express";
import axios from "axios";
import ejs from "ejs";
import $ from "jquery-jsdom";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let listNamesEncoded = [];
let currentLists = [];

app.get ("/", async (req, res) => {
     currentLists= [];
     listNamesEncoded = [];
    try {
        const result = await axios.get(
          "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=YrMRJHA6VyOI21DPcRUlkW0wPeOD5V3C"
        );
        const response = result.data;
        const { lists } = response.results;

        //Push each list_name_encoded from the list array to the current Lists
        lists.forEach(element => { 
            currentLists.push(element.display_name);
            listNamesEncoded.push(element.list_name_encoded);
        });
       // console.log(listNamesEncoded);
        res.render ("index.ejs" , {currentLists : currentLists});

    } catch (error) {
        console.log(error)
        res.status(500);
    }
})

//get method for random book title generator
app.get ("/randomBookTitle", async (req, res) => {
      
   // const clickedButton = req.id
    try {
        const result = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/combined-print-and-e-book-fiction.json?api-key=YrMRJHA6VyOI21DPcRUlkW0wPeOD5V3C`
        );
        const bookList = result.data.results.books;
        const randomNumber = Math.floor(Math.random() * bookList.length);
        const randomTitle = bookList[randomNumber].title;
        const randomAuthor = bookList[randomNumber].author;
        const randomDescription = bookList[randomNumber].description;
        const randomPicture = bookList[randomNumber].book_image;


        res.render("index.ejs", {title: randomTitle, author: randomAuthor, description: randomDescription, image: randomPicture, currentLists: currentLists})
    } catch (error) {
      console.log(error);
      res.status(500);
    }
})





export {currentLists , listNamesEncoded}

app.listen(port, () => {
    console.log (`Listening on Port ${port}`)
})