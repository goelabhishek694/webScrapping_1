let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let cheerio=require('cheerio');
let request=require("request");

request(url,cb);
function cb(error, response, body){
    if(error){
        console.log(error);
    }
    else{
        extractHTML(body);
    }
}

function extractHTML(html){
    let selectorTool=cheerio.load(html);
    let allTables=selectorTool(".table tbody");
    for(let i=0;i<4;i++){
        let allRowsinTable= selectorTool(allTables[i]).find("tr");
        for(let i=0;i<allRowsinTable.length;i=i+1){
            let link=selectorTool(allRowsinTable[i]).find("a").attr("href");
            if(link){
                getBirthday(link);
            }
        }
    }
}

function getBirthday(link){
    request(link,cb);
    function cb(error,response,body){
        if(error){
            console.log(error);
        }
        else{
            extractBirthday(body);
        }
    }
}

function extractBirthday(html){
    let selectorTool=cheerio.load(html);
    let nameAndBirthday=selectorTool(".ciPlayerinformationtxt span");
    let playerName= selectorTool(nameAndBirthday[0]).text();
    let birthDate=selectorTool(nameAndBirthday[1]).text().split(",");

    console.log(playerName+birthDate[0]+birthDate[1]);
}