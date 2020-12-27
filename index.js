
// ファイルを選択する
function onFileSelected(input) {

    var file = input.files[0];

    var element = document.getElementById('file_name');
    element.innerHTML = file.name;
    //console.log(element);


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

//画像をキャンバスに配置する
function createImageData(img) {

    var cv = document.createElement('canvas');

    cv.width = img.naturalWidth;
    cv.height = img.naturalHeight;

    var ct = cv.getContext('2d');

    ct.drawImage(img, 0, 0);

    var data = ct.getImageData(0, 0, cv.width, cv.height);

    return data;

}

