import { ApolloServer, gql } from "apollo-server-azure-functions";
import { uuid } from "uuidv4";

const database = {
  [uuid()]: {
    title: "Hooks in React",
    description: "Development made easy with hooks",
    createdAt: "Feb 17",
    author: "John Snow",
  },
};

const typeDefs = gql`
  input PostInput {
    title: String
    description: String
    createdAt: String
    author: String
  }

  input DeletePostInput{
    id: ID!
  }

  type Post {
    id: ID!
    title: String
    description: String
    createdAt: String
    author: String
  }

  type Query {
    getPost(id: ID!): Post
    getPosts: [Post]
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: ID!, input: PostInput): Post
    deletePost(input: DeletePostInput): Post
  }
`;

class Post {
  id: any;
  title: String;
  description: String;
  createdAt: String;
  author: String;

  constructor(id: String, { title, description, createdAt, author }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.author = author;
  }
}

const resolvers = {
  Mutation: {
    createPost: (_, { input }) => {
      const id = uuid();

      database[id] = input;
      return new Post(id, input);
    },
    updatePost: (_, { id, input }) => {
      if (!database[id]) {
        throw new Error("no Post exists with id " + id);
      }
      database[id] = input;
      return new Post(id, input);
    },
    deletePost: (_, { input }) => {

      const { id } = input
      if (!database[id]) {
        throw new Error("no Post exists with id " + id);
      }
      delete database[id];
      return 'Delete successful'
    },
  },
  Query: {
    getPost: (_, { id }) => {
      if (!database[id]) {
        throw new Error("no Post exists with id " + id);
      }
      return new Post(id, database[id]);
    },
    getPosts: (_) => {
      let arr = [];
      for (var key in database) {
        if (database.hasOwnProperty(key)) {
          arr.push({
            id: key,
            title: database[key].title,
            description: database[key].description,
            createdAt: database[key].createdAt,
            author: database[key].author,
          });
        }
      }
      return arr;
    },
  },
};
// @ts-ignore
const server = new ApolloServer({ typeDefs, resolvers, playground: true });

export default server.createHandler({
  cors: {
    origin: "*",
  },
});
