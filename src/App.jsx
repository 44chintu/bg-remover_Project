import { useState } from "react";
import UploadBox from "./components/UploadBox";
import Preview from "./components/Preview";
import ManualCropper from "./components/ManualCropper";

function App() {
  const [originalImage, setOriginalImage] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  return (
    <div className="app-layout">
      {/* MAIN CONTENT */}
      <div className="main-content">
        <div className="container">
          <h1>Free Background Remover</h1>
          <p className="subtitle">
            Your images never leave your device. Remove backgrounds instantly.
            <br />
            <span>
              All processing happens locally in your browser — nothing is uploaded to any server.
            </span>
          </p>

          <div className="card highlight-card">
            <div className="feature-grid">
              <div>
                <h3>Privacy-first</h3>
                <p>
                  We do not store your images. Every pixel is processed locally in your browser.
                </p>
              </div>
              <div>
                <h3>Fast results</h3>
                <p>
                  Upload, remove the background, and download a clean PNG in seconds.
                </p>
              </div>
              <div>
                <h3>Free to use</h3>
                <p>
                  No account required. Just drop a photo and get started right away.
                </p>
              </div>
            </div>
          </div>

          {/* Upload */}
          <div className="card">
            <UploadBox setOriginalImage={setOriginalImage} />
          </div>

          {/* SIDE BY SIDE VIEW */}
          {(originalImage || resultImage) && (
            <div
              className="card"
              style={{
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                overflowX: "auto"
              }}
            >
              {/* ORIGINAL */}
              {originalImage && (
                <div style={{ width: "280px", textAlign: "center" }}>
                  <Preview
                    originalImage={originalImage}
                    setResultImage={setResultImage}
                  />
                </div>
              )}

              {/* RESULT */}
              {resultImage && (
                <div style={{ width: "280px", textAlign: "center" }}>
                  <h3 className="column-title">Result</h3>

                  <img
                    src={resultImage}
                    style={{
                      width: "100%",
                      maxHeight: "260px",
                      objectFit: "contain",
                      borderRadius: "8px"
                    }}
                  />

                  <br /><br />

                  <button onClick={() => setShowCropper(true)}>
                    Crop Image
                  </button>

                  <br /><br />

                  <a href={resultImage} download="no-bg-hd.png">
                    Download PNG (HD)
                  </a>
                </div>
              )}

              {/* CROPPER */}
              {showCropper && resultImage && (
                <div style={{ width: "320px", textAlign: "center" }}>
                  <h3 className="column-title">Crop</h3>

                  <ManualCropper
                    image={resultImage}
                    onCropDone={(img) => {
                      setResultImage(img);
                      setShowCropper(false);
                    }}
                  />
                </div>
              )}
            </div>
          )}

          <section className="card">
            <h2>How it works</h2>
            <ol className="steps">
              <li>Upload a photo (PNG or JPG).</li>
              <li>Click “Remove Background” and wait a few seconds.</li>
              <li>Download your transparent PNG.</li>
              <li>Use the crop tool if you want a tighter frame.</li>
            </ol>
          </section>

          <section className="card">
            <h2>Why choose this tool?</h2>
            <div className="benefits-grid">
              <div>
                <h3>No uploads</h3>
                <p>Your images never touch a server, keeping your content private.</p>
              </div>
              <div>
                <h3>Free forever</h3>
                <p>There are no paywalls or credit packs to unlock downloads.</p>
              </div>
              <div>
                <h3>Works on any device</h3>
                <p>Desktop and mobile browsers are supported without installing software.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>Frequently asked questions</h2>
            <div className="faq-grid">
              <div>
                <h3>Do you upload my images?</h3>
                <p>No. Everything runs locally in your browser and never leaves your device.</p>
              </div>
              <div>
                <h3>What file types are supported?</h3>
                <p>We support common image types like PNG and JPG.</p>
              </div>
              <div>
                <h3>Is there a size limit?</h3>
                <p>Large images may take longer, but there is no strict limit enforced.</p>
              </div>
              <div>
                <h3>Is the result transparent?</h3>
                <p>Yes. The download is a PNG with a transparent background.</p>
              </div>
              <div>
                <h3>Can I crop the result?</h3>
                <p>Absolutely. Use the built-in crop tool after processing.</p>
              </div>
            </div>
          </section>

          <section className="card">
            <h2>About</h2>
            <p>
              This project is built to make background removal fast, private, and accessible.
              It uses on-device segmentation so that your images stay on your computer or phone.
            </p>
            <p>
              Questions or feedback? Reach out any time at
              <a href="mailto:khaja.rahamatulla44@gmail.com"> khaja.rahamatulla44@gmail.com</a>.
            </p>
          </section>

          <p className="footer">
            © {new Date().getFullYear()} Background Remover •
            <a href="/privacy.html"> Privacy</a> •
            <a href="/terms.html"> Terms</a> •
            <a href="/contact.html"> Contact</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
