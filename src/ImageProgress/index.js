import React from "react";

import "./index.css";

export default function ImageProgress({
  fileList = [],
  itemRender = (file, i) => {
    const { name, status } = file;
    return (
      <div
        key={i}
        className={`image-progress success-img ${
          status === "uploading" ? "uploading-img" : ""
        }  ${status === "error" ? "error-img" : ""}`}
      >
        {name}
        <div>{status}</div>
      </div>
    );
  },
}) {
  return fileList?.map((o, i) => {
    return itemRender(o, i);
  });
}
