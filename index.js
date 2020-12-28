
// ファイルを選択する
function onFileSelected(input) {

    var file = input.files[0];

    var element = document.getElementById('file_name');
    element.innerHTML = file.name;

    var reader = new FileReader();
    reader.onload = onFileLoaded;
    reader.readAsDataURL(file);

}

//ファイルを読み込む
function onFileLoaded(e) {

    var src_data = e.target.result;

    var img = new Image();

    img.onload = onImageSetted;
    img.src = src_data;

}



//画像をセットする
function onImageSetted(e) {

    var data = createImageData(e.target);

    document.getElementById('test_canvas').getContext('2d').putImageData(data, 0, 0);

}

CANVAS_SIZE=256;

//画像をキャンバスに配置する
function createImageData(img) {

    var cv = document.createElement('canvas');
    var canvas = document.getElementById('test_canvas')

    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;

    var ct = cv.getContext('2d');

    // 画像の圧縮
    var canvas_width = canvas.width;
    var canvas_height = canvas.height;
    
    var canvas_ratio = canvas_height / canvas_width;
    var img_ratio = cv.height / cv.width;
    if (img_ratio <=  canvas_ratio) {   // 横長のとき
        var new_width = canvas_width;
        var ratio_comp = canvas_width / cv.width;
        var new_height = ratio_comp * cv.height;
    }
    else {               // 縦長のとき
        new_height = canvas_height;
        ratio_comp = canvas_height / cv.height;
        new_width = ratio_comp * cv.width;

    }

    ct.drawImage(img, 0, 0, new_height, new_width);

    var data = ct.getImageData(0, 0, cv.width, cv.height);

    return data;

}


