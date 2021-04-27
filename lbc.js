let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
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
    let ballCommentary=selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    console.log(selectorTool(ballCommentary[0]).text());
}