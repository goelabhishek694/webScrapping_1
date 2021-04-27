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
    let bowlersList=selectorTool(".match-scorecard-page .table.bowler tbody tr");
    let highestWicket=0;
    let hwtName="";
    for(let i=0;i<bowlersList.length;i++){
        let nameAndWicket=selectorTool(bowlersList[i]).find("td");
        let wickets= selectorTool(nameAndWicket[4]).text();
        let cricketerName=selectorTool(nameAndWicket[0]).find("a").text();
        console.log(cricketerName + " -> " + wickets);
        if(wickets>=highestWicket){
            highestWicket=wickets;
            hwtName=cricketerName;
        }

    }
    console.log();
    console.log("Highest Wicket Taker is");
    console.log(hwtName + " -> " + highestWicket);
}

