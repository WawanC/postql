import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  hello() {
    return "Hello World";
  }
}

const main = async () => {
  const app = express();
  const schema = await buildSchema({ resolvers: [HelloResolver] });

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
