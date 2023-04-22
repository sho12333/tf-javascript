const inputElement = document.getElementById("file");

inputElement.addEventListener("change", () => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = (e) => setImage(e.target);
    img.src = e.target.result;
  };

  reader.readAsDataURL(inputElement.files[0]);
});

function _updatePredictions() {
  const canvas = document.getElementById("canvas").getContext("2d");
  const imgData = canvas.getImageData(0, 0, 256, 256);

  cocoSsd.load().then((model) => {
    model.detect(imgData).then((predictions) => {
      const lbl_element = document.getElementById("label");
      lbl_element.innerHTML = predictions[0].class;

      const percent_element = document.getElementById("percent");
      percent_element.innerHTML = Math.round(predictions[0].score * 100) + "%";
    });
  });
}

function setImage(img) {
  const ct = document.getElementById("canvas").getContext("2d");
  ct.drawImage(img, 0, 0, canvas.width, canvas.height);

  const data = ct.getImageData(0, 0, canvas.width, canvas.height);
  document.getElementById("canvas").getContext("2d").putImageData(data, 0, 0);
}
