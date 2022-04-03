import { useEffect, useRef, useState } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const [start, setStart] = useState<boolean>(false);

  const createPostHandler: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (enteredImage && enteredImage.size > 1024 * 1000) {
      setError("Image size cannot be larger than 1 MB");
      return;
    }

    props.onCreatePost(enteredTitle, enteredDesc, enteredImage);

    setEnteredTitle("");
    setEnteredDesc("");
    if (imageRef.current?.value) {
      imageRef.current.value = "";
    }
    props.closeModal();
  };

  useEffect(() => {
    setStart(true);
  }, []);

  return (
    <main className="absolute w-full h-full flex justify-center items-end md:items-center z-10 overflow-hidden">
      <div
        className={`absolute w-full h-full bg-black -z-10 ${
          !start && "transition-all opacity-0"
        } ${start && "transition-all opacity-50"}`}
        onClick={(event) => {
          event.stopPropagation();
          setStart(false);
          const x = setTimeout(() => {
            props.closeModal();
            clearTimeout(x);
          }, 150);
        }}
      />
      <section
        className={`bg-white p-4 w-full md:w-auto ${
          !start && "transition-all translate-y-full opacity-0"
        } ${start && "transition-all -translate-y-0 opacity-100"}`}
      >
        <h1 className="text-2xl font-bold text-center">Create New Post</h1>
        {error && <h2 className="text-red-500 text-center">{error}</h2>}
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
              accept={".png, .jpg, .jpeg"}
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
