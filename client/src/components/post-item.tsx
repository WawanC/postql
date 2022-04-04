interface IPostItem {
  title: string;
  description: string;
  image?: string;
}

const PostItem: React.FC<IPostItem> = (props) => {
  return (
    <div className="border border-black text-left">
      <div className="p-2">
        <h1 className="font-bold">{props.title}</h1>
        <p>{props.description}</p>
      </div>
      {props.image && (
        <div className="w-full">
          <img
            src={`https://postql-wawan.herokuapp.com/${props.image}`}
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
};

export default PostItem;
