//ファイル選択
function onFileSelected(input) {
  let file = input.files[0];

  let element = document.getElementById("file_name");
  element.innerHTML = file.name;

  let reader = new FileReader();
  reader.onload = onFileLoaded;
  reader.readAsDataURL(file);
}

//ファイル読み込み
function onFileLoaded(e) {
  let src_data = e.target.result;

  let img = new Image();
  img.onload = onImageSetted;
  img.src = src_data;
}

function updatePredictions() {
  console.log("click");
  const canvas = document.getElementById("test_canvas").getContext("2d");
  const imgData = canvas.getImageData(0, 0, 256, 256);

  cocoSsd.load().then((model) => {
    model.detect(imgData).then((predictions) => {
      var element = document.getElementById("label_name");
      element.innerHTML = predictions[0].class;

      var element = document.getElementById("percent");
      element.innerHTML = Math.round(predictions[0].score * 100) + "%";
    });
  });
}

//画像をセットする
function onImageSetted(e) {
  let data = createImageData(e.target);

  document
    .getElementById("test_canvas")
    .getContext("2d")
    .putImageData(data, 0, 0);
}

const CANVAS_SIZE = 256;

//画像をキャンバスに配置する
function createImageData(img) {
  let cv = document.createElement("canvas");
  let canvas = document.getElementById("test_canvas");

  cv.width = img.naturalWidth;
  cv.height = img.naturalHeight;

  let ct = cv.getContext("2d");

  // 画像の圧縮
  let canvas_width = canvas.width;
  let canvas_height = canvas.height;

  let canvas_ratio = canvas_height / canvas_width;
  let img_ratio = cv.height / cv.width;

  let new_width;
  let new_height;
  let ratio_comp;

  if (img_ratio <= canvas_ratio) {
    // 横長のとき
    new_width = canvas_width;
    ratio_comp = canvas_width / cv.width;
    new_height = ratio_comp * cv.height;
  } else {
    // 縦長のとき
    new_height = canvas_height;
    ratio_comp = canvas_height / cv.height;
    new_width = ratio_comp * cv.width;
  }

  ct.drawImage(img, 0, 0, new_height, new_width);

  let data = ct.getImageData(0, 0, cv.width, cv.height);

  return data;
}
