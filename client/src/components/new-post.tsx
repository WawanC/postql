import { useRef, useState } from "react";

interface INewPost {
  closeModal: () => void;
  onCreatePost: (
    title: string,
    description: string,
    image: File | null
  ) => Promise<any>;
}

const NewPost: React.FC<INewPost> = (props) => {
  const [enteredTitle, setEnteredTitle] = useState<string>("");
  const [enteredDesc, setEnteredDesc] = useState<string>("");
  const [enteredImage, setEnteredImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const createPostHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    props.onCreatePost(enteredTitle, enteredDesc, enteredImage);

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
