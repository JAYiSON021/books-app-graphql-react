const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList
} = graphql;

const _ = require('lodash');

// Some dummy data
let books = [{
        name: 'Start with why',
        genre: 'Anthology',
        id: '1',
        authorId: '1'
    },
    {
        name: 'My very own life',
        genre: 'Autobiography',
        id: '2',
        authorId: '2'
    },
    {
        name: 'Leadership for students',
        genre: 'Guide',
        id: '3',
        authorId: '3'
    },
    {
        name: 'Leadership for teachers',
        genre: 'Guide',
        id: '4',
        authorId: '3'
    },
    {
        name: 'Find your why',
        genre: 'Anthology',
        id: '5',
        authorId: '1'
    },
];

let authors = [{
        name: 'Simon Sinek',
        age: 39,
        id: '1'
    },
    {
        name: 'Jayson San Agustin',
        age: 22,
        id: '2'
    },
    {
        name: 'John Maxwell',
        age: 85,
        id: '3'
    },
];

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authors, { id: parent.authorId });
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return _.filter(books, { authorId: parent.id })
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from database
                return _.find(books, {
                    id: args.id
                });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // code to get data from database
                return _.find(authors, {
                    id: args.id
                });
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})