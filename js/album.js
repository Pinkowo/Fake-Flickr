let URL = "https://script.google.com/macros/s/AKfycbyAdQ9c8vbq4W2amts6CfrIc_bz49QOULzWICPUibuRlOfSMvxG67uYE5ZZQOY8AjmJ/exec";
const imgStr = "https://images.pexels.com/photos/ID_HERE/pexels-photo-ID_HERE.jpeg";
let pageID = document.location.toString().split('?')[1]; //抓取網址

let param = {};
param.method = 'getFakeAPI';
param.uid = '110719028';
param.token = 'ElWPQn2HCDYz2q';
param.id = pageID;

$(document).ready(function() {
  $.post(URL, param,
    function (data) {
        console.log(data); 
        startPage();
        headerPage(data);    
        photoPage(data); 
        endPage();  
    }).fail(function(data){
        console.log('fail');
    });
});


//最上面的nav，在album.html
function startPage(){
  let template2 = $('#t02');
  let node2 = template2.html();
  $('body').append(node2);
}
//header
function headerPage(data){
  let imgUrl = imgStr.replace(/ID_HERE/g, data.data.images[0].imgurl);
  let template03 = t03(imgUrl,data.data.name,data.data.photoNum,data.data.videoNum,data.data.viewNum,data.data.authorImg,data.data.author);
  $('body').append(template03);
}
//imgs
function photoPage(data){
  let node = [];
    for(let i=0;i<data.data.images.length;i++){
      let imgUrl = imgStr.replace(/ID_HERE/g, data.data.images[i].imgurl);
      node.push(t01(imgUrl,data.data.images[i].title,data.data.images[i].author,data.data.images[i].likeNum,data.data.images[i].commentNum));
    }
    let node2 = node.join('');
    let node3 = 
      `<section class="minhz-500 bg-my3 pb-5 ps-2">
        <div class="container">
          <div class="row">
            ${node2}
          </div>
        </div>
      </section>`;
    $('body').append(node3);
}
//footer，在album.html
function endPage(){
  let template4 = $('#t04');
  let node4 = template4.html();
  $('body').append(node4);
}


//imgs
function t01(IMG_HERE, TITLE_HERE, AUTHOR_HERE, LIKENUM_HERE, COMMENTNUM_HERE){
  let html =
    `<div class="col-4">
      <div class="box hz-250 mt-3">
        <img class="img object-fit-cover" src="${IMG_HERE}";>
        <div class="info d-flex justify-content-between align-items-end text-white">
          <div class="text">
            <div class="fz-14 fw-bold">${TITLE_HERE}</div>
            <div class="fz-12 fc-gray">相片擁有者 ${AUTHOR_HERE}</div>
          </div>
          <div class="text fz-14">
            <i class="fa fa-star-o" aria-hidden="true"></i>&nbsp ${LIKENUM_HERE} &nbsp&nbsp
            <i class="fa fa-comment-o" aria-hidden="true"></i>&nbsp ${COMMENTNUM_HERE}
          </div>
        </div>
      </div>
    </div>`;
  return html;
}

//header
function t03(IMG_HERE, NAME_HERE, PHOTONUM_HERE, VIDEONUM_HERE, VIEWNUM_HERE, AUTHORPHOTO_HERE, AUTHOR_HERE){
  let html =
    `<header class="hz-420 bg-my3">
      <div class="container">
        <div class="d-inline-block w-100 hz-420 ms-1 position-relative">
          <img class="img-header w-100 h-100 object-fit-cover position-absolute" src="${IMG_HERE}" alt="">
          <div class="w-100 h-100 position-absolute justify-content-center mt-4">
            <div class="text w-100 hz-100 text-center fz-60 text-light mb-5">${NAME_HERE}</div>
            <div class="text w-100 text-center fz-14 text-light">${PHOTONUM_HERE} 張相片 · ${VIDEONUM_HERE} 個影片 · ${VIEWNUM_HERE} 次檢視</div>
            <button type="button" class="btn dblock-mauto"><i class="fa fa-share text-light fz-20 mt-3" aria-hidden="true"></i></button>
            <img class="img-author dblock-mauto wz-60 hz-60 object-fit-cover mt-5" src="${AUTHORPHOTO_HERE}" alt="">
            <button type="button" class="btn dblock-mauto"><div class="btn-author text text-center fz-14 text-light mt-2">相片擁有者：${AUTHOR_HERE}</div></button>
          </div>
        </div>
      </div>
    </header>`;
  return html;
}