const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const loadesTypes = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
// construct a schema, using GraphQL schema language

const schema = makeExecutableSchema({
  typeDefs: loadesTypes,
});
const root = {
  posts: require("./posts/posts.model"),
  comments: require("./comments/comments.model"),
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
