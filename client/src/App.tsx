import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import PostItem from "./components/post-item";
import { CREATE_POST_QUERY, GET_POSTS_QUERY } from "./gql/post";
import { ICreatePost, IGetPosts } from "./interfaces/post";

function App() {
  const postsData = useQuery<IGetPosts>(GET_POSTS_QUERY);
  const [createPostFn, createPostData] = useMutation<any, ICreatePost>(
    CREATE_POST_QUERY
  );

  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDesc, setEnteredDesc] = useState<string>("");

  const createPostHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const result = await createPostFn({
      variables: { title: enteredTitle, description: enteredDesc },
    });
    console.log(result.data);

    setEnteredTitle("");
    setEnteredDesc("");
  };

  return (
    <main className="flex flex-col items-center p-4 gap-4">
      <section className=" w-fit text-center p-2">
        <h1 className="text-xl font-bold">PostQL</h1>
        <h2 className="italic font-light">Post CRUD, but with GraphQL</h2>
      </section>

      {createPostData.loading ? (
        <div className="text-xl">Loading...</div>
      ) : (
        <form className="flex flex-col gap-1" onSubmit={createPostHandler}>
          {createPostData.error && (
            <h1 className="text-red-500">
              An error occurred when creating post
            </h1>
          )}
          {createPostData.data && (
            <h1 className="text-green-500">Post successfully created</h1>
          )}
          <div className="flex flex-col">
            <label htmlFor="title">Title :</label>
            <input
              value={enteredTitle}
              onChange={(event) => setEnteredTitle(event.target.value)}
              type="text"
              id="title"
              className="border border-black p-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description :</label>
            <textarea
              value={enteredDesc}
              onChange={(event) => setEnteredDesc(event.target.value)}
              id="description"
              cols={30}
              rows={2}
              className="border border-black p-1"
              required
              maxLength={56}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-200 p-1 border border-black w-fit"
          >
            Create Post
          </button>
        </form>
      )}

      <section className="flex flex-col gap-2 items-center">
        <h1 className="text-xl underline">Posts List</h1>
        <div className="flex flex-col gap-2">
          {postsData.loading ? (
            "Loading..."
          ) : postsData.data ? (
            postsData.data.getPosts.length === 0 ? (
              "No posts yet."
            ) : (
              postsData.data.getPosts.map((post) => (
                <PostItem
                  key={post.id}
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
  );
}

export default App;
