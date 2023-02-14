var fs = require('fs');

//readFileSync: 동기
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
console.log(result);
console.log('C');

//readFile: 비동기(코들르 짤 때 반드시 비동기로 해야 함)
console.log('A');
fs.readFile('syntax/sample.txt', 'utf-8', function(err, result){
    console.log(result); 
});// 파일 읽기 작업 끝나면 알아서 function 실행: call-back
console.log('C');