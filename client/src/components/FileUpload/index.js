import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import API from "../../utils/API";

import "./style.css";

const CLOUDINARY_UPLOAD_PRESET = "mrptyjwx";
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/goalden/upload";

export default class FileUpload extends Component {
  state = {
    uploadedFile: null,
    uploadedFileCloudinaryUrl: ""
  };

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
        let editProfilePic = {
          colName: "image",
          info: this.state.uploadedFileCloudinaryUrl
        };
        API.editUser(this.props.userID, editProfilePic).then(res => {
          console.log(res);
          console.log(editProfilePic);
        });
      }
    });
  }

  render() {
    return (
      <>
        <div className="FileUpload">
          <Dropzone
            onDrop={this.onImageDrop.bind(this)}
            accept="image/*"
            multiple={false}
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {
                    <div className="fileDropDiv">
                      <i className="material-icons">file_download</i>
                      <br />
                      <b>Choose a file</b> or drag it here.
                    </div>
                  }
                </div>
              );
            }}
          </Dropzone>
        </div>

        <div>
          {this.state.uploadedFileCloudinaryUrl === "" ? null : (
            <div>
              {this.state.uploadedFile.name ? (
                <p>{this.state.uploadedFile.name}</p>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}
