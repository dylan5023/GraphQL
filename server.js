const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        posts: [Post]
        comments: [Comment]
    }
    type Post {
        id:ID!
        title: String!
        description: String!
        comments: [Comment]
    }
    type Comment {
        id:ID!
        text: String!
        likes: Int
    }
    `);
const root = {
  posts: [
    {
      id: "post1",
      title: "It is a first post",
      description: "It is a first post description",
      comments: [
        {
          id: "comment1",
          text: "It is a first comment",
          likes: 1,
        },
      ],
    },
    {
      id: "post2",
      title: "It is a second post",
      description: "It is a second post description",
      comments: [],
    },
  ],
  comments: [
    {
      id: "comment1",
      text: "It is a first comment",
      likes: 1,
    },
  ],
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
const port = 4000;

app.listen(port, () => {
  console.log(`Running on port at http://localhost:${port}/graphql`);
});
