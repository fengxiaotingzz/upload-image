import React, { useRef, useState } from "react";

import "./index.css";

function Upload({
  children,
  multiple = true,
  url = "",
  disabled = false,
  onCheck = () => true,
  onChange = () => {},
  headers = {},
  accept = "",
  maxCount,
  fileList = [],
}) {
  const [fileData, setFileData] = useState(fileList);
  const inputRef = useRef();

  const onClickInput = () => {
    const ele = inputRef.current;
    !disabled && ele.click();
  };

  const onChangeFile = (e) => {
    const list = e.target.files;
    const files = Array.from(list);
    if (!onCheck(files)) return false;

    let fileArr = files;
    const len = files.length;
    if (len >= maxCount) {
      fileArr = files.slice(len - maxCount, len);
    }

    fileArr.map((o) => {
      o.status = "uploading";

      const controller = new AbortController();
      const { signal } = controller;

      o.cancel = () => controller.abort();

      onChange(o, [...fileData, ...fileArr]);
      const formData = new FormData();
      formData.append("file", o);

      setFileData([...fileData, ...fileArr] || []);

      fetch(url, {
        body: formData,
        method: "POST",
        signal,
        headers,
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          o.res = res;
          onChange(o, [...fileData, ...fileArr]);
        })
        .catch((e) => {
          if (e.message === "The user aborted a request.") {
            o.status = "cancel";
          } else {
            o.status = "error";
          }
          onChange(o, [...fileData, ...fileArr]);
        })
        .then(() => {
          setFileData([...fileData, ...fileArr] || []);
        });
    });
  };

  const showDisabled = disabled || fileData.length >= maxCount;

  return (
    <div
      className={`upload-images-box ${
        showDisabled && "disabled-upload-images-box"
      }`}
    >
      <div onClick={() => !showDisabled && onClickInput()}>
        {children || "上传"}
      </div>
      <input
        type="file"
        multiple={multiple}
        ref={inputRef}
        onChange={onChangeFile}
        value=""
        className="input"
        accept={accept}
      />
    </div>
  );
}

export default Upload;
