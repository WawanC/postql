interface IPostItem {
  title: string;
  description: string;
}

const PostItem: React.FC<IPostItem> = (props) => {
  return (
    <div className="border border-black p-2 w-80">
      <h1 className="font-bold">{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );
};

export default PostItem;
