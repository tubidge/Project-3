import React, { Fragment, useState } from "react";
import Message from "../Message";
import axios from "axios";

const profilePicStyle = {
  width: "50%"
};

const FileUpload = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose picture");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");

  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(formData);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("Picture uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <Fragment>
      <div className="text-center">
        <h3>{uploadedFile.fileName}</h3>
        <img
          style={profilePicStyle}
          src={uploadedFile.filePath}
          className="img-fluid img-circle"
          alt={uploadedFile.filename}
        />
      </div>
      <form onSubmit={onSubmit}>
        <div className="custom-file mt-3">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        {message ? <Message msg={message} /> : null}
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block"
        />
      </form>
    </Fragment>
  );
};

export default FileUpload;
