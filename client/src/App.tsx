import { gql, useQuery } from "@apollo/client";
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

interface IPost {
  id: string;
  title: string;
  description: string;
}

interface IGetPosts {
  getPosts: IPost[];
}

function App() {
  const PostsData = useQuery<IGetPosts>(GET_POSTS_QUERY);

  return (
    <main className="flex flex-col items-center p-4 gap-4">
      <section className=" w-fit text-center p-2">
        <h1 className="text-xl font-bold">PostQL</h1>
        <h2 className="italic font-light">Post CRUD, but with GraphQL</h2>
      </section>

      <form className="flex flex-col gap-1">
        <div className="flex flex-col">
          <label htmlFor="title">Title :</label>
          <input
            type="text"
            id="title"
            className="border border-black p-1"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description :</label>
          <textarea
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
        <div>
          {PostsData.loading
            ? "Loading..."
            : PostsData.data
            ? PostsData.data.getPosts.map((post) => (
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
