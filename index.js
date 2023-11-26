import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {API_KEY} from "./modules/API Key.js"

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const currentLists = [];
const listNamesEncoded = [];

app.get ("/", async (req, res) => {
    try {
        const result = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${API_KEY}`
        );
        const response = result.data;
        const { lists } = response.results;

        //Push each list_name_encoded from the list array to the current Lists
        lists.forEach(element => { 
            currentLists.push(element.display_name);
            listNamesEncoded.push(element.list_name_encoded);
        });
       // console.log(listNamesEncoded);
        res.render ("index.ejs" , {currentLists : currentLists, encodedNames: listNamesEncoded});

    } catch (error) {
        console.log(error)
        res.status(500);
    }
})

let lists;

app.post ("/randomBookTitle", async (req, res) => {
      lists = req.body.lists;
    try {
        const result = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/${lists}.json?api-key=${API_KEY}`
        );
        
        const data = result.data;

        const listName = data.results.list_name;

        const allBooks = data.results.books
        const randomBookNumber = Math.floor(Math.random() * allBooks.length);
        const selectedBook= allBooks[randomBookNumber];

        
        let {title , author , description , book_image, buy_links} = selectedBook;
        let buyLink = buy_links[0].url;
           


        res.render("Book Suggestion.ejs", {
          listName: listName,
          title: title,
          author: author,
          description: description,
          image: book_image,
          buy: buyLink,
          currentLists: currentLists,
          encodedNames: listNamesEncoded,
        });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
})



app.listen(port, () => {
    console.log (`Listening on Port ${port}`)
})