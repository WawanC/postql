import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";

const main = async () => {
  const app = express();
  const schema = await buildSchema({ resolvers: [PostResolver] });

  const apolloServer = new ApolloServer({
    schema: schema,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(8000, () => {
    console.log("Server listening on 8000...");
  });
};

main();
