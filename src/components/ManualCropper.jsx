import React, { useState, useRef } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

function ManualCropper({ image, onCropDone }) {

  const imgRef = useRef(null);

  const [crop, setCrop] = useState({
    unit: "%",
    x: 5,
    y: 5,
    width: 90,
    height: 90
  });

  const [completedCrop, setCompletedCrop] = useState(null);

  function applyCrop() {
    if (!completedCrop || !imgRef.current) return;

    const img = imgRef.current;

    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;

    const canvas = document.createElement("canvas");
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      img,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    onCropDone(canvas.toDataURL("image/png"));
  }

  return (
    <div style={{ maxWidth: "600px" }}>
      <ReactCrop
        crop={crop}
        onChange={(c) => setCrop(c)}
        onComplete={(c) => setCompletedCrop(c)}
      >
        <img
          ref={imgRef}
          src={image}
          alt="crop"
          style={{ maxWidth: "100%" }}
        />
      </ReactCrop>

      <br />

      <button onClick={applyCrop}>
        Apply Crop
      </button>
    </div>
  );
}

export default ManualCropper;
