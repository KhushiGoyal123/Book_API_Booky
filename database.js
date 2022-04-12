let books = [{
    ISBN: "12345Book",
    title: "Getting Started with MERN",
    pubDate: "2021-07-07",
    language: "en",  // english
    numPage: "250",
    author: [1,2],  // specifying id of the author
    publication: [1],
    category: ["tech", "programming", "education"],
},
{
    ISBN: "123456789Secret",
    title: "Secret Book",
    pubDate: "2021-08-07",
    language: "en",  // english
    numPage: "250",
    author: [1,2],  // specifying id of the author
    publication: [1],
    category: ["tech","mystery", "programming", "education"],
},
];

let author = [
    {
        id: 1,
        name: "Khushi",
        books: ["12345Book", "123456789Secret"],
    },
    {
        id: 2,
        name: "Elon Musk",
        books: ["12345Book"],
    },
];

let publication = [
    {
        id: 1,
        name: "WriteX",
        books: ["12345Book"],
    },
    {
        id: 2,
        name: "Bansal Publications",
        books: [],
    },
    
];

module.exports = {books, author, publication};