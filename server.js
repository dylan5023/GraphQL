const express = require("express");

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
        description: String
}`);
const root = {
  description: "hello world",
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
