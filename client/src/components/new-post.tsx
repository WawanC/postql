import { useMutation } from "@apollo/client";
import { useRef, useState } from "react";
import { CREATE_POST_QUERY } from "../gql/post";
import { ICreatePost } from "../interfaces/post";

interface INewPost {
  closeModal: () => void;
}

const NewPost: React.FC<INewPost> = (props) => {
  const [createPostFn, createPostData] = useMutation<any, ICreatePost>(
    CREATE_POST_QUERY
  );

  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDesc, setEnteredDesc] = useState<string>("");
  const [enteredImage, setEnteredImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const createPostHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const result = await createPostFn({
      variables: {
        title: enteredTitle,
        description: enteredDesc,
        image: enteredImage,
      },
    });
    console.log(result.data);

    setEnteredTitle("");
    setEnteredDesc("");
    if (imageRef.current?.value) {
      imageRef.current.value = "";
    }
    props.closeModal();
  };

  return (
    <main className="absolute w-full h-full flex justify-center items-end md:items-center z-10">
      <div
        className="absolute w-full h-full bg-black -z-10 opacity-50"
        onClick={(event) => {
          event.stopPropagation();
          props.closeModal();
        }}
      />
      <section className="bg-white p-4 w-full md:w-auto">
        <h1 className="text-xl font-bold text-center">Create New Post</h1>
        <form
          className="flex flex-col gap-2 w-full"
          onSubmit={createPostHandler}
        >
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
          <div className="flex flex-col">
            <label htmlFor="title" className="font-bold">
              Title :
            </label>
            <input
              multiple={false}
              value={enteredTitle}
              onChange={(event) => setEnteredTitle(event.target.value)}
              type="text"
              id="title"
              className="border border-black p-1"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description" className="font-bold">
              Description :
            </label>
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
          <div className="flex flex-col">
            <label htmlFor="image" className="font-bold">
              Image :
            </label>
            <input
              type="file"
              name="image"
              id="image"
              onChange={(event) => {
                if (!event.target.files) return;
                setEnteredImage(event.target.files[0]);
              }}
              ref={imageRef}
            />
          </div>
          <button
            type="submit"
            className="bg-gray-200 p-1 border border-black w-fit self-center"
          >
            Create Post
          </button>
        </form>
      </section>
    </main>
  );
};

export default NewPost;
