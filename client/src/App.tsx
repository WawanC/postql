import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import NewPost from "./components/new-post";
import PostItem from "./components/post-item";
import {
  CREATE_POST_QUERY,
  GET_POSTS_QUERY,
  NEW_POST_SUBSCRIPTION_QUERY,
} from "./gql/post";
import {
  ICreatePost,
  IGetPosts,
  INewPostSubscriptionData,
  IPost,
} from "./interfaces/post";

function App() {
  const postsData = useQuery<IGetPosts>(GET_POSTS_QUERY);
  const [createPostFn, createPostData] = useMutation<any, ICreatePost>(
    CREATE_POST_QUERY
  );

  const [isCreatePost, setIsCreatePost] = useState<boolean>(false);

  useEffect(() => {
    postsData.subscribeToMore<INewPostSubscriptionData>({
      document: NEW_POST_SUBSCRIPTION_QUERY,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newPost: IPost = subscriptionData.data.newPostSubscription;
        return Object.assign<any, IGetPosts, IGetPosts>({}, prev, {
          getPosts: [newPost, ...prev.getPosts],
        });
      },
    });
  }, []);

  const createPostHandler = async (
    title: string,
    description: string,
    image: File | null
  ) => {
    await createPostFn({
      variables: {
        title: title,
        description: description,
        image: image,
      },
    });
  };

  return (
    <>
      {isCreatePost && (
        <NewPost
          onCreatePost={createPostHandler}
          closeModal={() => setIsCreatePost(false)}
        />
      )}
      <main
        className={`flex flex-col items-center p-4 gap-4 bg-red-100 w-full sm:w-1/2 lg:w-1/3 ${
          isCreatePost && "overflow-hidden h-screen"
        }`}
      >
        <section className="text-center p-2">
          <h1 className="text-xl font-bold">PostQL</h1>
          <h2 className="italic font-light">
            Share your post, but with GraphQL
          </h2>
        </section>

        {createPostData.loading && (
          <h1 className="text-blue-500 text-center">Please wait...</h1>
        )}
        {createPostData.error && (
          <h1 className="text-red-500 text-center">
            An error occurred when creating post
          </h1>
        )}
        {createPostData.data && (
          <h1 className="text-green-500 text-center">
            Post successfully created
          </h1>
        )}

        <button
          className="bg-gray-200 p-2 border border-black"
          onClick={() => setIsCreatePost((value) => !value)}
        >
          Create New Post
        </button>

        <section className="flex flex-col gap-2 items-center w-full bg-green-100">
          <h1 className="text-xl underline">Posts List</h1>
          <div className="flex flex-col gap-2 w-full text-center">
            {postsData.loading ? (
              "Loading..."
            ) : postsData.data ? (
              postsData.data.getPosts.length === 0 ? (
                "No posts yet."
              ) : (
                postsData.data.getPosts.map((post) => (
                  <PostItem
                    key={post.id}
                    image={post.image}
                    title={post.title}
                    description={post.description}
                  />
                ))
              )
            ) : (
              <p className="text-red-500">An error occurred</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
