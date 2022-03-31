function App() {
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

      <section>
        <h1 className="underline">Posts List</h1>
      </section>
    </main>
  );
}

export default App;
