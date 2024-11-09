export const FileImageVideo = ({
  url,
  type,
}: {
  url: string;
  type: string;
}) => {
  return (
    <div>
      {type === "IMAGE" ? (
        <img src={url} alt="" className="cursor-pointer" />
      ) : (
        <video src={url} controls className="cursor-pointer"></video>
      )}
    </div>
  );
};
