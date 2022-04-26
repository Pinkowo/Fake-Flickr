let URL = "https://script.google.com/macros/s/AKfycbyAdQ9c8vbq4W2amts6CfrIc_bz49QOULzWICPUibuRlOfSMvxG67uYE5ZZQOY8AjmJ/exec";
const imgStr = "https://images.pexels.com/photos/ID_HERE/pexels-photo-ID_HERE.jpeg";
let albumID = ['110719028','110713046','110713026','110713054','110717015','110819012','110819011','110815037','110819009','110819019','110819020','110819038','110919002','110919030','110919040'];

var anchor = document.getElementById("myAnchor");
var result = anchor.toString();

let param = {};
param.method = 'getFakeAPI';
param.uid = '110719028';
param.token = 'ElWPQn2HCDYz2q';
param.id = albumID[0];

$(document).ready(function() {
    startPage();
    let node2 = [];
    for(let i=0;i<albumID.length;i++){
        param.id = albumID[i];
        $.ajax({
            type: 'POST',
            url: URL,
            data: param,
            async:true,
            success: function(data){
                console.log(data);
                let node = photoPage(data,i);                
                node2.push(node);
                console.log("node2:"+node2.length+",albumID:"+albumID.length);
                if(node2.length >= albumID.length){
                    photoPage2(node2);
                    endPage();
                }
            }
          }).fail(function(){
            console.log('fail');
        });
    }
});

//imgs
function photoPage(data,i){
    let imgUrl = imgStr.replace(/ID_HERE/g, data.data.images[0].imgurl);
    return t02(albumID[i],imgUrl,data.data.name,data.data.photoNum,data.data.viewNum);
}
function photoPage2(node){
    let node2 = node.join('');
    let node3 = 
    `<section class="minhz-500 bg-my3 pt-5 pb-4">
        <div class="container">
            <div class="row">
                ${node2}
            </div>
        </div>
    </section>`;
    $('body').append(node3);
}
function t02(ID_HERE,IMG,NAME,PHOTONUM,VIEWNUM){
    let html =
    `<div class="col-3 mb-3">
        <a href="./album.html?${ID_HERE}" target="_blank">
        <div class="box hz-200">
            <img class="img object-fit-cover" src="${IMG}";>
            <div class="info d-flex  text-white">
            <div class="text fw-bold">
                <div>${NAME}</div>
                <div class="fz-14">${PHOTONUM} 張相片 · ${VIEWNUM} 次檢視</div>
            </div>
            <div class="icon">
                <i class="fa fa-share text-light fz-20" aria-hidden="true"></i>
            </div>
            </div>
        </div>
        </a>
    </div>`;
    return html;
}
//相簿上方包含header和nav的部分，在index.html
function startPage(){
    let template = $('#t01');
    let node5 = template.html();
    $('body').append(node5);
}
//相簿下方footer，在index.html
function endPage(){
    let template4 = $('#t03');
    let node4 = template4.html();
    $('body').append(node4);
  }