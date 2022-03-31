import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import PostItem from "./components/post-item";

const GET_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      id
      title
      description
    }
  }
`;

const CREATE_POST_QUERY = gql`
  mutation CreatePost($title: String!, $description: String!) {
    createPost(title: $title, description: $description)
  }
`;

interface IPost {
  id: string;
  title: string;
  description: string;
}

interface IGetPosts {
  getPosts: IPost[];
}

interface ICreatePost {
  title: string;
  description: string;
}

function App() {
  const postsData = useQuery<IGetPosts>(GET_POSTS_QUERY);
  const [createPostFn, _] = useMutation<any, ICreatePost>(CREATE_POST_QUERY);

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

      <form className="flex flex-col gap-1" onSubmit={createPostHandler}>
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

      <section className="flex flex-col gap-2 items-center">
        <h1 className="text-xl underline">Posts List</h1>
        <div className="flex flex-col gap-2">
          {postsData.loading
            ? "Loading..."
            : postsData.data
            ? postsData.data.getPosts.map((post) => (
                <PostItem
                  key={post.id}
                  title={post.title}
                  description={post.description}
                />
              ))
            : "Error Occurred"}
        </div>
      </section>
    </main>
  );
}

export default App;
