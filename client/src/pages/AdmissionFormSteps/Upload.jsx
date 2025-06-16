import DocumentsUpload from "./DocumentsUpload";
import PhotoUpload from "./PhotoUpload";

const Upload = ({ state, dispatch }) => {
  return (
    <div className="space-y-4">
      <PhotoUpload state={state} dispatch={dispatch} />
      <DocumentsUpload state={state} dispatch={dispatch} />
    </div>
  );
};

export default Upload;
