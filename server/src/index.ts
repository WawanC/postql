import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

const main = async () => {
  const app = express();
  const httpServer = createServer(app);
  const schema = await buildSchema({ resolvers: [PostResolver] });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/subscriptions",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const apolloServer = new ApolloServer({
    schema: schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  httpServer.listen(8000, () => {
    console.log("Server listening on 8000...");
  });
};

main();
