// Requirements for our Project - Book Management API

// We are a Book Management Company

// Books
// ISBN (international standard book number)
// title
// pubdate (published date)
// language
// num page (number of pages)
// author[]
// publications[]
// category[]


// Authors
// Id
// name
// books[]


// Publications
// id
// name
// books[]


// What are all the API's that we need....

// Books
// we need an API

// GET
// to get all books ✅🍕
// to get specific books ✅🍕
// to get list of books based on category ✅🍕
// to get list of books based on languages ✅✔🍕

// POST (purpose: to send a data)
// add a new book✅

// PUT (purpose: update)
// to update book title ✅
// to update/add new author for a book✅

// DELETE (purpose: delete)
// delete a book ✅
// delete an author from a book  {{Error}}😢


// Authors

// GET
// we need an API
// to get all authors ✅🍕
// to get specific authors based on id ✅✔
// to get list of authors based on books ✅

// POST
// add new author ✅

// PUT
// update author name using its id ✅

// DELETE
// delete an author {{Error}}😢


// Publications
// we need an API

// GET
// to get all publications ✅
// to get specific publications based on id ✅✔
// to get list of publications based on books ✅✔

// POST
// add new publcations✅✔

// PUT
// update the publication name using its id✅✔
// update/add new book to a publication ✅

// DELETE
// delete the publication {{Error}}😢
// delete a book from publications {{Error}}😢


/* 
browser only implement or support GET http method for other Http methods like post, put, delete,
we need HTTP CLIENT (helper who helps you to make http request)
tool or http client is postman
*/



/*
    HOW THE SERVER SERVES THE REQUEST? -> CLIENT-SERVER ARCHITECTURE

    client can be postman, frontend of application(UI well.
    postman -> http tool
    client can be anything that is sending request to the server.

    eg.
    node & express server -------> Postman

    (req,res) -----> req -> is what we are sending to the server
    After receiving the request, the server will parse it in JSON format
    it will seperate params, body, heading and many other data.

    res.json ---> response from server
    ----> the request given to the server is responded by res.json
    entered inside.

*/