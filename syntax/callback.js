/*
function a(){
    console.log('A');
}
*/

var a = function(){   //JavaScript에서 함수는 값이다.
    console.log('A');
}

function slowfunc(callback){
    callback();
}

slowfunc(a);