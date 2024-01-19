const typeDefs = `#graphql
    type Query {
        bookCount: Int
        authorCount: Int
        books(author: String, genre: String): [Book!]!
        book(id: ID!): Book
        authors: [Author!]!
        author(id: ID!): Author
        me: User
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        books: [Book!]
        bookCount: Int
    }

    type Mutation {
        deleteBook(id: ID!): [Book],
        addBook(book: AddBookInput!): Book,
        updateAuthor(id: ID!, edits: EditAuthorInput!): Author
        createUser(
            username: String!
            favoriteGenre: String
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    input AddBookInput {
        title: String!,
        author: AuthorInput!
        published: Int!,
        genres: [String!],
        born: Int
    }

    input AuthorInput {
        name: String!
        born: Int
    }

    input EditAuthorInput {
        born: Int
    }

    type Token {
        value: String!
    }

    type User {
        username: String!
        favoriteGenre: String
        id: ID!
    }

    type Subscription {
        bookAdded: Book!
    }
    
`

module.exports = { typeDefs };