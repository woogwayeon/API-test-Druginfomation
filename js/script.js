window.onload=function(){
    let moreBtn = document.querySelector(".more");
    let prev = 10;

    moreBtn.addEventListener("click", function(){
        prev = prev + 10;
        getDrugData(prev);
    });
}

function getDrugData(prev){

    let drugBox = document.querySelector(".drug");

    const opts = {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    };

    fetch(`http://apis.data.go.kr/1471000/DrbEasyDrugInfoService/getDrbEasyDrugList?serviceKey=fR5BUorrHEGr2sEcCFDjdSujBBPgY5FM2yuMgnrmWt1GGERyFITmt%2Fuv5YJ6XOWL3CVvm%2FzoEtK%2FKJs7zIZz3w%3D%3D&trustEntpName=%ED%95%9C%EB%AF%B8%EC%95%BD%ED%92%88(%EC%A3%BC)&pageNo=1&startPage=1&numOfRows=${prev}&type=json`, opts)
        .then(res => res.json())
        .then(function(data){
            console.log(data);
            console.log(data.body.items);

            let drugData = data.body.items;

            for(var i=0; i<drugData.length; i++){
                //console.log(drugData[i]);

                let htmlTag = ` 
                <div class="drugWrap">
                    <p><span class="hd">약 이름</span> ${ drugData[i].itemName }</p>
                    <p><span class="hd">효능</span> ${ drugData[i].efcyQesitm }</p>
                    <p><span class="hd">사용방법</span> ${ drugData[i].useMethodQesitm }</p>
                    <p><span class="hd">제조사</span> ${ drugData[i].entpName }</p>
                </div>`;

                drugBox.insertAdjacentHTML("beforeend", htmlTag);

            }
        })
        .catch(function(err){
            console.log(err);
        });
}