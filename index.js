import express from "express";
import axios from "axios";
import ejs from "ejs";
import $ from "jquery-jsdom";
import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const API_KEYS = "YrMRJHA6VyOI21DPcRUlkW0wPeOD5V3C";

let currentLists = [];
let listNamesEncoded = [];

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
        res.render ("index.ejs" , {currentLists : currentLists, encodedNames: listNamesEncoded});

    } catch (error) {
        console.log(error)
        res.status(500);
    }
})

//get method for random book title generator
app.post ("/randomBookTitle", async (req, res) => {
      
   // const clickedButton = req.id
    try {
        const result = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${API_KEYS}`
        );
        
        const data = result.data;

        const allLists = data.results.lists
        const randomListNumber = Math.floor(Math.random() * allLists.length);
        const selectedList = allLists[randomListNumber];


        const allBooks = selectedList.books;
        const randomBookNumber = Math.floor(Math.random() * allBooks.length);
        const selectedBook = allBooks[randomBookNumber];
        
        let { display_name } = selectedList;
        let {title , author , description , book_image, buy_links} = selectedBook;
        let buyLink = buy_links[0].url;
           


        res.render("index.ejs", {listName: display_name , title: title, author: author, description: description, image: book_image, buy : buyLink, currentLists : currentLists})
    } catch (error) {
      console.log(error);
      res.status(500);
    }
})



app.listen(port, () => {
    console.log (`Listening on Port ${port}`)
})