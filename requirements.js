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
// to get all books βπ
// to get specific books βπ
// to get list of books based on category βπ
// to get list of books based on languages ββπ

// POST (purpose: to send a data)
// add a new bookβ

// PUT (purpose: update)
// to update book title β
// to update/add new author for a bookβ

// DELETE (purpose: delete)
// delete a book β
// delete an author from a book  {{Error}}π’


// Authors

// GET
// we need an API
// to get all authors βπ
// to get specific authors based on id ββ
// to get list of authors based on books β

// POST
// add new author β

// PUT
// update author name using its id β

// DELETE
// delete an author {{Error}}π’


// Publications
// we need an API

// GET
// to get all publications β
// to get specific publications based on id ββ
// to get list of publications based on books ββ

// POST
// add new publcationsββ

// PUT
// update the publication name using its idββ
// update/add new book to a publication β

// DELETE
// delete the publication {{Error}}π’
// delete a book from publications {{Error}}π’


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