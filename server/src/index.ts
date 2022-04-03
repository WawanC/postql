import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PostResolver } from "./resolvers/post";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import path from "path";
import { clearImages } from "./utils/clearImages";

const main = async () => {
  clearImages();

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

  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(graphqlUploadExpress());

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  httpServer.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening on ${process.env.PORT || 8000}`);
  });
};

main();
