import { SelfieSegmentation } from "@mediapipe/selfie_segmentation";

let segmenter = null;

export async function loadModel() {
  if (!segmenter) {
    segmenter = new SelfieSegmentation({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`,
    });

    segmenter.setOptions({
      modelSelection: 1,
    });
  }
  return segmenter;
}

export async function removeBackground(img) {
  const model = await loadModel();

  return new Promise((resolve) => {
    model.onResults((results) => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");

      // Smooth mask edges
      ctx.filter = "blur(4px)";
      ctx.drawImage(results.segmentationMask, 0, 0, canvas.width, canvas.height);

      // Keep only person
      ctx.globalCompositeOperation = "source-in";
      ctx.filter = "none";
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL("image/png"));
    });

    model.send({ image: img });
  });
}
