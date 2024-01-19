const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      me: async (_, args, context) => context.currentUser,
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      books: async (_, args) => {
        const query = {};
  
      
        if (args.author) {
          const foundAuthor = await Author.findOne({ name: args.author });
          if (foundAuthor) {
            query.author = foundAuthor._id;
          }
        }
      
        if (args.genre) {
          query.genres = { $in: [args.genre] };
        }
      
        const result = await Book.find(query).populate('author');
        return result;
      },
      book: async (_, args) => Book.findOne({ id: args.id }),
      authors: async () => Author.find({}),
      author: async (_, args) => Author.findOne({ name: args.name }),
    },
    Author: {
        books: async (root) => Book.find({ author: root._id }),
        bookCount: async (root) => Book.collection.countDocuments({ author: root._id })
    },
    Book: {
      author: async (root) => Author.findOne({ _id: root.author }),
      genres: async (root) => root.genres,
    },
    Mutation: {
        deleteBook: async (_, args) => {
            const deletedBook = await Book.findOneAndDelete({ id: args.id });
            return deletedBook;
          },
      addBook: async (_, args, context) => {
        const currentUser = context.currentUser
  
        if (!currentUser) {
            throw new GraphQLError('not authenticated', {
              extensions: {
                code: 'BAD_USER_INPUT',
              }
            })
          }
  
        try {
          let author = await Author.findOne({ name: args.book.author.name });
  
          if (!author) {
            author = new Author ({
              ...args.book.author,
            });
  
            await author.save();
          }
      
          let book = new Book ({
            ...args.book,
            author,
          });
  
          console.log('book RIGHT HERE: ', book);
  
          await book.save();

          await pubsub.publish('BOOK_ADDED', { bookAdded: book })

          return book;
  
        } catch (error) {
          console.error('Error in addBook mutation:', error);
          throw new GraphQLError('Saving book failed: Title must be at least 3 letters long.', null, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            }
          });
        }

      },
      updateAuthor: async (_, args, context) => {
        const currentUser = context.currentUser;
  
        if (!currentUser) {
          throw new GraphQLError("not authenticated");
        }
      
        try {
          let author = await Author.findOne({ _id: args.id });
  
          console.log('Author: ');
          console.log(author);
      
          if (!author) {
            throw new GraphQLError("Author not found", null, null, null, ['NOT_FOUND']);
          }
      
          author.born = args.edits.born;
      
          await author.save();
      
          return author;
        } catch (error) {
          console.error('Error in updateAuthor mutation:', error);
      
          if (error instanceof GraphQLError) {
            throw error;
          }
      
          throw new GraphQLError('Updating author failed', null, null, null, [error.message]);
        }
      },
      createUser: async (_, args) => {
        const user = new User({ username: args.username.toLowerCase(), favoriteGenre: args.favoriteGenre.toLowerCase() });
  
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            });
          });
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username });
  
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('Invalid username or password', {
            extensions: {
              code: 'UNAUTHENTICATED',
            }
          });;
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        },
    },
};

module.exports = resolvers