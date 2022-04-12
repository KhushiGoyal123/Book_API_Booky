require("dotenv").config();

// Frame Work
const express = require("express");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

// Models
const BookModel = require("./database/book");

const AuthorModel = require("./database/author");

const PublicationModel = require("./database/publication");

// Initialisation
const booky = express();

// Configuration
booky.use(express.json());

// Establish Database connections
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
    }
).then(() => console.log("Connection Established!!") );


/*
    Route           /
    Description     Get all books
    Access          PUBLIC
    Parameter       NONE
    Methods         GET
*/

booky.get("/", async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
});


/*
    Route           /is
    Description     Get specific books based on ISBN
    Access          PUBLIC
    Parameter       isbn
    Methods         GET
*/

booky.get("/is/:isbn", async (req,res) => {

    const getSpecificBook = await BookModel.findOne({ISBN : req.params.isbn});


    if(!getSpecificBook) {
        return res.json({error: `No book found for the ISBN of ${req.params.isbn}`,
    });
    }
    return res.json({ getSpecificBook });
});


/*
    Route           /c
    Description     Get list of books based on category
    Access          PUBLIC
    Parameter       category
    Methods         GET
*/

booky.get("/c/:category", async (req, res) => {

    const getSpecificBook = await BookModel.findOne({category: req.params.category,
    });
        

    if(!getSpecificBook){
        return res.json({error: `No book found for the category of ${req.params.category}`,
    });
    }
    return res.json({ getSpecificBook });
});


/*
    Route           /l
    Description     Get list of books based on language
    Access          PUBLIC
    Parameter       language
    Methods         GET
*/

booky.get("/l/:language", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({language:req.params.language,
    });

    if(!getSpecificBook){
        return res.json({error: `No book found for the language of ${req.params.language}`,
    });
    }
    return res.json({  getSpecificBook });
});


/*
    Route           /author
    Description     Get all authors
    Access          PUBLIC
    Parameter       NONE
    Methods         GET
*/

booky.get("/author", async(req,res)=> {
    const getAllAuthors = await AuthorModel.modelName.find();
    return res.json({  getAllAuthors });
});


/*
    Route           /author/id
    Description     Get specific authors based on id
    Access          PUBLIC
    Parameter       id
    Methods         GET
*/

booky.get("/author/id/:id", async (req, res) => {
    const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id});

    if(!getSpecificAuthor){
        return res.json({error: `No author found for the id of ${req.params.id}`,
    });
    }
    return res.json({ getSpecificAuthor });
});


/*
    Route           /author/book
    Description     Get specific authors based on books
    Access          PUBLIC
    Parameter       isbn
    Methods         GET
*/

booky.get("/author/book/:isbn", async (req,res) =>{
    const getSpecificAuthor = await AuthorModel.findOne({ISBN: req.params.isbn});

    if(!getSpecificAuthor){
        return res.json({error: `No author found for the book of ${req.params.isbn}`,
    });
    }
    return res.json({  getSpecificAuthor });
});


/*
    Route           /publications
    Description     Get all publications
    Access          PUBLIC
    Parameter       NONE
    Methods         GET
*/

booky.get("/publications", async(req, res) =>{
    const getAllPublications = await PublicationModel.modelName.find();
    return res.json({getAllPublications });
});



/*
    Route           /pub
    Description     Get specific publications based on id
    Access          PUBLIC
    Parameter       id
    Methods         GET
*/

booky.get("/pub/:id", async (req, res) =>{
    const getSpecificPublication = await PublicationModel.findOne({pubId: req.params.id});


if(!getSpecificPublication){
    return res.json({error: `No publication found for the id of ${req.params.id}`,
});
}
return res.json({ getSpecificPublication })
});






/*
    Route           /publication/book
    Description     Get specific publications based on books
    Access          PUBLIC
    Parameter       isbn
    Methods         GET
*/

booky.get("/publication/book/:isbn", async (req,res) =>{
    const getSpecificPublication = await PublicationModel.findOne({ISBN: req.params.isbn});

    if(!getSpecificPublication){
        return res.json({error: `No publication found for the book of ${req.params.isbn}`,
    });
    }
    return res.json({ getSpecificPublication });
});





/*
    Route           /book/add (or we can say /book/new)
    Description     Add a new book
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
*/

booky.post("/book/add", async (req,res) => {
    const { newBook } = req.body;   //de-structing ES6 concept
    BookModel.create(newBook);
   
    return res.json({
    message: "book was added!" 
    });
});


/*
    Route           /author/add 
    Description     Add a new author
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
*/

booky.post("/author/add", (req,res) => {
    const { newAuthor } = req.body;   //de-structing ES6 concept
    AuthorModel.create(newAuthor);
    return res.json({ message: "author was added!" });
});


/*
    Route           /publication/add 
    Description     Add a new publication
    Access          PUBLIC
    Parameter       NONE
    Methods         POST
*/

booky.post("/publication/add", (req,res) => {
    const { newPublication } = req.body;   //de-structing ES6 concept
    PublicationModel.create(newPublication);
    return res.json({ message: "publication was added!" });
});


/*
    Route           /book/update/title
    Description     Update book title
    Access          PUBLIC
    Parameter       isbn
    Methods         PUT
*/
/* two approaches: forEach(directly access database object and updates it, it will only 
update the required data) 
and map ( does not directly updates it but makes a copy of this array i.e. new array)
and u need to replace them again & again.*/

booky.put("/book/update/title/:isbn", (req,res) => {
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.title = req.body.newBookTitle;
            return;
        }
    });
    return res.json({ books: database.books});
});


/*
    Route           /book/update/author
    Description     Update/add new author for a book
    Access          PUBLIC
    Parameter       isbn, authorId
    Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorId", (req, res) => {
    // update book database
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });

    // update author database
    database.author.forEach((author) =>{
        if(author.id === parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });

    return res.json({ books: database.books, author: database.author });
});


/*
    Route           /author/update/name
    Description     Update author name using its id 
    Access          PUBLIC
    Parameter       id
    Methods         PUT
*/

booky.put("/author/update/name/:id", (req,res) => {
    database.author.forEach((author) =>{
        if(author.id === parseInt(req.params.id)){
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return res.json({author: database.author});
});

/*
    Route           /publication/update/name
    Description     Update the publication name using its id
    Access          PUBLIC
    Parameter       id
    Methods         PUT
*/

booky.put("/publication/update/name/:id", (req,res) => {
    database.publication.forEach((publication) =>{
        if(publication.id === parseInt(req.params.id)){
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return res.json({publication: database.publication});
});

/*
    Route           /publication/update/book
    Description     Update/add new book to a publication
    Access          PUBLIC
    Parameter       isbn
    Methods         PUT
*/

booky.put("/publication/update/book/:isbn", (req, res)=>{
    // update the publication database
    database.publication.forEach((publication)=> {
    if(publication.id === req.body.pubId) {
       return publication.books.push(req.params.isbn);
    }
});

    // update the book database
    database.books.forEach((book) => {
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
});
    return res.json({books: database.books, 
        publications: database.publications, 
        message:"Successfully updated publication",
    });
});


/*
    Route           /book/delete
    Description     Delete a book
    Access          PUBLIC
    Parameter       isbn
    Methods         DELETE
*/

booky.delete("/book/delete/:isbn", (req, res)=>{
    const updatedBookDatabase = database.books.filter((book) => 
        book.ISBN !== req.params.isbn 
    );

    database.books = updatedBookDatabase;
    return res.json({ books: database.books});
});

/*
    Route           /book/delete/author
    Description     Delete an author from a book
    Access          PUBLIC
    Parameter       isbn, authorId
    Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    // update the book database
    database.books.forEach((book) => {
      if (book.ISBN === req.params.isbn) {
        const newAuthorList = book.authors.filter(
          (author) => author !== parseInt(req.params.authorId)
        );
        book.authors = newAuthorList;
        return;
      }
    });

    // update the author database
    database.authors.forEach((author) => {
      if (author.id === parseInt(req.params.authorId)) {
        const newBooksList = author.books.filter(
          (book) => book !== req.params.isbn
        );
  
        author.books = newBooksList;
        return;
      }
    });
  
    return res.json({
      message: "author was deleted!!!!!!😪",
      book: database.books,
      author: database.authors,
    });
  });
/*
    Route           /author/delete
    Description     Delete an author
    Access          PUBLIC
    Parameter       authorId
    Methods         DELETE
*/

booky.delete("/author/delete/:authorId", (req, res)=>{
    const updatedAuthorDatabase = database.authors.filter((author) => 
        author.id !== req.params.id
    );

    database.authors = updatedAuthorDatabase;
    return res.json({ author: database.authors});
});


/*
    Route           /publication/delete
    Description     Delete a publication
    Access          PUBLIC
    Parameter       pubId
    Methods         DELETE
*/

booky.delete("/publication/delete/:pubId", (req, res)=>{
    const updatedPublicationDatabase = database.publications.filter(
        (publication) => publication.id !== req.params.id
    );

    database.publications = updatedPublicationDatabase;
    return res.json({ publication: database.publications});
});



/*
    Route           /publication/delete/book
    Description     Delete a book from publication
    Access          PUBLIC
    Parameter       isbn, publication id
    Methods         DELETE
*/

booky.delete("/publication/delete/book/:isbn/:pubId", (req,res) =>{
    // update publication database
    database.publications.forEach((publication) =>{
        if(publication.id === parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter(
                (book)=> book !== req.params.isbn
            );
                publication.books = newBooksList;
                return;
        }
    });

    // update book database
    database.books.forEach((book) => {
        if(books.ISBN === req.params.isbn) {
            book.publication = 0; // no publication available
          return;
        } 
    });
   

    return res.json({ 
        books: database.books, 
        publications: database.publications,
    });
});

booky.listen(3000, () => console.log("Hey server is running!😎"));

