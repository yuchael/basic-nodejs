var testFolder = './data'; // './'는 현재 디렉토리라는 뜻으로 없어도 되지만 있으면 더 명확해짐.
var fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist); // nodejs는 파일 목록을 배열 형식으로 알려준다.
});