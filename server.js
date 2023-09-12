const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { loadFilesSync } = require("@graphql-tools/load-files");
const path = require("path");
const port = 4000;

const { ApolloServer } = require("apollo-server-express");

const loadedFiles = loadFilesSync("**/*", {
  extensions: ["graphql"],
});

const loadedResolvers = loadFilesSync(
  path.join(__dirname, "**/*.resolvers.js")
);

async function startApolloServer() {
  const app = express();

  const schema = makeExecutableSchema({
    typeDefs: loadedFiles,
    resolvers: loadedResolvers,
  });

  //   Apollo server object contatins all the middleware
  // logic to handle incoming graphical requests
  const server = new ApolloServer({
    schema,
  });

  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, () => {
    console.log(`Running a GraphQL API server...`);
  });
}

startApolloServer();
