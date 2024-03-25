import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {API_KEY}from "./modules/apiKey.js"

const port = 3000;
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const currentLists = [];
const listNamesEncoded = [];

app.get ("/", async (req, res) => {
    try {
        const result = await axios.get(
            `https://api.nytimes.com/svc/books/v3/lists/overview.json`, {
              params: {
                "api-key": API_KEY
              }
            }
        );
        const response = result.data;
        const { lists } = response.results;

        //Push each list_name_encoded from the list array to the current Lists
        lists.forEach(element => { 
            currentLists.push(element.display_name);
            listNamesEncoded.push(element.list_name_encoded);
        });
       // console.log(listNamesEncoded);
        res.render ("index.ejs" , {
          //NavBar working
          currentLists : currentLists, 
          encodedNames: listNamesEncoded});

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
          `https://api.nytimes.com/svc/books/v3/lists/${lists}.json`, {
            params: {
              "api-key": API_KEY
            }
          }
        );
        
        const data = result.data;

        const {list_name , list_name_encoded} = data.results;
       

        const allBooks = data.results.books
        const randomBookNumber = Math.floor(Math.random() * allBooks.length);
        const selectedBook= allBooks[randomBookNumber];

        
        let {title , author , description , book_image, buy_links} = selectedBook;
        buy_links = buy_links[0].url;
           


        res.render("Book Suggestion.ejs", {
          title: title,
          author: author,
          description: description,
          image: book_image,
          buy: buy_links,
          //NavBar working
          currentLists: currentLists,
          encodedNames: listNamesEncoded,
          encodedName: list_name_encoded,
          listName: list_name,
        });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
})
app.post("/allLists" , async (req, res) =>{

    try {
      const result = await axios.get(
        `https://api.nytimes.com/svc/books/v3/lists/full-overview.json` , {
          params: {
            "api-key": API_KEY
          }
        }
      );

      const data = result.data;
      const {lists} = data.results

      const randomListNumber = Math.floor(Math.random() * lists.length);
      const selectedList = lists[randomListNumber];
      const { list_name, list_name_encoded } = selectedList;
      
      
      const randomBookNumber = Math.floor(Math.random() * selectedList.books.length);
      const randomBook = selectedList.books[randomBookNumber];

      let {title , author , description , book_image, buy_links} = randomBook;
      buy_links = buy_links[0].url;

      res.render("Book Suggestion.ejs", {
        title: title,
        author: author,
        description: description,
        image: book_image,
        buy: buy_links,

        //NavBar working
        currentLists: currentLists,
        encodedNames: listNamesEncoded,
        encodedName: list_name_encoded,
        listName: list_name,
      });
    

    } catch (error) {
      console.log(error);
      res.status(500);
    }
});



app.post("/completeList", async (req, res) => {
  let bookTitles = [];
  let bookImages = [];

    const lists = req.body.encoded;
    try {
        const result = await axios.get(
          `https://api.nytimes.com/svc/books/v3/lists/${lists}.json`,
          {
            params: {
              "api-key": API_KEY,
            },
          }
        );

            const data = result.data;

            const { list_name, list_name_encoded, books } = data.results;

            
            books.forEach((element) => {
              bookTitles.push(element.title);
              bookImages.push(element.book_image);
            
            });

        res.render("bookLists.ejs", {
          //NavBar working
          currentLists: currentLists,
          encodedNames: listNamesEncoded,
          encodedName: list_name_encoded,
          listName: list_name,

          //Current list displaying
          thisList: list_name,
          bookNames: bookTitles,
          image: bookImages,
        
        });
    } catch (error) {
        console.log(error);
        res.status(500);
    }

})

app.listen(port, () => {
    console.log (`Listening on Port ${port}`)
})