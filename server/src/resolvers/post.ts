import {
  Arg,
  Args,
  Mutation,
  PubSub,
  PubSubEngine,
  Query,
  Resolver,
  Root,
  Subscription,
} from "type-graphql";
import { CreatePostArgs, Post, UpdatePostArgs } from "../models/post";

@Resolver()
export class PostResolver {
  private posts: Post[] = [];

  @Query(() => [Post])
  getPosts() {
    return this.posts;
  }

  @Mutation(() => String)
  async createPost(
    @Args(() => CreatePostArgs) { title, description }: CreatePostArgs,
    @PubSub() pubSub: PubSubEngine
  ) {
    const newPost = new Post(title, description);
    this.posts.push(newPost);
    await pubSub.publish("NEW_POST", newPost);
    return "Create Post Success";
  }

  @Mutation(() => String)
  updatePost(
    @Args(() => UpdatePostArgs) { id, title, description }: UpdatePostArgs
  ) {
    const postIdx = this.posts.findIndex((post) => post.id === id);
    if (postIdx < 0) {
      throw new Error("Post Not Found");
    }
    this.posts[postIdx].title = title;
    this.posts[postIdx].description = description;
    return "Update Post Success";
  }

  @Mutation(() => String)
  deletePost(@Arg("id", () => String) postId: string) {
    const postIdx = this.posts.findIndex((post) => post.id === postId);
    if (postIdx < 0) {
      throw new Error("Post Not Found");
    }
    this.posts.splice(postIdx, 1);
    return "Delete Post Success";
  }

  @Subscription({
    topics: "NEW_POST",
  })
  newPostSubscription(@Root() payload: Post): Post {
    return payload;
  }
}
