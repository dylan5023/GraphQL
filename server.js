const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");

const loadesTypes = loadFilesSync("**/*", {
  extensions: ["graphql"],
});
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "**/*.resolvers.js")
);

// construct a schema, using GraphQL schema language

const schema = makeExecutableSchema({
  typeDefs: loadesTypes,
  resolvers: loadedResolvers,
});

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
const port = 4000;

app.listen(port, () => {
  console.log(`Running on port at http://localhost:${port}/graphql`);
});
