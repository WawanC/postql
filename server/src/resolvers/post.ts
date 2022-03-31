import {
  Arg,
  Args,
  ArgsType,
  Field,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Post } from "../models/post";

@ArgsType()
class CreatePostArgs {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  description!: string;
}

@ArgsType()
class UpdatePostArgs extends CreatePostArgs {
  @Field(() => String)
  id!: string;
}

@Resolver()
export class PostResolver {
  private posts: Post[] = [];

  @Query(() => [Post])
  getPosts() {
    return this.posts;
  }

  @Mutation(() => String)
  createPost(
    @Args(() => CreatePostArgs) { title, description }: CreatePostArgs
  ) {
    const newPost = new Post(title, description);
    this.posts.push(newPost);
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
}
