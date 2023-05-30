import React, { useState } from "react";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import { Button } from "../../Styles/Form/Button/Button";
import { Label } from "../../Styles/Form/Label/Label";
import { LabelError } from "../../Styles/Form/LabelError/LabelError";
import { H1 } from "../../Styles/H1/H1";

type Resize = "none" | "both" | "horizontal" | "vertical" | "initial" | "inherit";

const MAX_IMAGE_COUNT = 5;

const AddProject = ({ placeholder }: any) => {
  const [editorHtml, setEditorHtml] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [error, setError] = useState("");
  const [imageCount, setImageCount] = useState(0);

  const handleChange = (html: any) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const images = tempDiv.getElementsByTagName("img");

    if (images.length > MAX_IMAGE_COUNT) {
      setError(
        `Exceeded the maximum image count. You can only add ${MAX_IMAGE_COUNT} images.`
      );
      return;
    }

    setEditorHtml(html);
    setImageCount(images.length);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    axios
      .post("http://localhost:8080/api/projects", {
        projectName,
        projectStatus,
        projectUrl,
        editorHtml,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    const images = Array.from(files).filter((file) => file.type.includes("image/"));
    const remainingSlots = MAX_IMAGE_COUNT - imageCount;

    if (images.length > remainingSlots) {
      setError(
        `Exceeded the maximum image count. You can only add ${remainingSlots} more images.`
      );
      return;
    }

    const promises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Data = reader.result?.toString() || "";
          resolve(base64Data);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(image);
      });
    });

    Promise.all(promises)
      .then((base64Images) => {
        const updatedHtml: any = base64Images.reduce((html, base64Image) => {
          const imgTag = `<img src="${base64Image}" alt="Image" />`;
          return html + imgTag;
        }, editorHtml);

        setEditorHtml(updatedHtml);
        setImageCount(imageCount + images.length);
      })
      .catch((error) => {
        setError("An error occurred while processing the images.");
        console.error(error);
      });
  };

  const editorStyle: React.CSSProperties = {
    height: "400px",
    width: "100%",
    resize: "vertical" as Resize,
    overflow: "auto",
    borderRadius: "10px",
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
      ["code"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "code",
  ];

  return (
    <AddProjectStyles>
      <div className="project-container">
        <H1>Add Project</H1>
        <div className="add-form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <Label htmlFor="project-name">Project title</Label>
              <input
                type="text"
                id="projectName"
                name="projectName"
                value={projectName}
                onChange={(event) => setProjectName(event.target.value)}
              />
              <LabelError>Error</LabelError>
              <Label htmlFor="project-status">Status</Label>
              <select
                name="projectStatus"
                id="project-status"
                value={projectStatus}
                onChange={(event) => setProjectStatus(event.target.value)}
              >
                <option value="">Select status</option>
                <option value="inProgress">In Progress</option>
                <option value="finished">Finished</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <LabelError>Error</LabelError>
              <Label htmlFor="project-url">URL</Label>
              <input
                type="text"
                id="project-url"
                name="projectUrl"
                value={projectUrl}
                onChange={(event) => setProjectUrl(event.target.value)}
              />
              <LabelError>Error</LabelError>
              <div
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderRadius: "10px",
                  margin: "0 auto",
                }}
                onDrop={handleDrop}
              >
                <ReactQuill
                  onChange={handleChange}
                  value={editorHtml}
                  modules={modules}
                  formats={formats}
                  bounds=".app"
                  placeholder={placeholder}
                  style={editorStyle}
                />
              </div>
              <LabelError>Error</LabelError>
            </div>
            <div className="input-group">
              <Button type="submit">Add</Button>
              <Button type="reset">Reset</Button>
            </div>
          </form>
        </div>
      </div>
      {error && <div>Error: {error}</div>}
    </AddProjectStyles>
  );
};

export default AddProject;

const AddProjectStyles = styled.main`
  max-width: 1900px;
  margin: 0 auto;

  .project-container {
    margin: 1em;

    .add-form-container {
      form {
        .input-group {
          display: flex;
          flex-direction: column;
          justify-content: center;

          input,
          select {
            padding: 0.5em;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
        }

        .input-group:last-child {
          display: flex;
          flex-direction: row;
          gap: 1em;
        }
      }
    }
  }
`;