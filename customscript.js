
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'panchangam.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {

        // .open will NOT return a value but simply returns undefined in async mode so use a callback
        callback(xobj.responseText);

        }
    }
    xobj.send(null);

}

// Call to function to get JSON file
loadJSON(function(response) {
    var todaysDate;
    todaysDate = getTodaysDate();
    //console.log(todaysDate);

    // create JSON variable
    jsonresponse = JSON.parse(response);
    // Get list of records
    jsonrecords = jsonresponse.RECORDS;
    jsonrecords.forEach(function(obj) { 
        //console.log(obj.date);
        if(obj.date === todaysDate){
            setHtmlTableContent(obj);
            return;
        }

   });
});
    
function getTodaysDate() {

    var today = new Date();
    var dd = today. getDate();
    var mm = today. getMonth()+1;
    var yyyy = today. getFullYear();
    var todayDate = dd + '/' + mm + '/' + yyyy;
    return todayDate;
}

function setHtmlTableContent(panchangamData){
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var today = new Date();
    var day = days[ today.getDay() ];
    var month = months[ today.getMonth() ];
    var dd = today. getDate();
    var yyyy = today. getFullYear();
    console.log(panchangamData);
    document.getElementById("todaysDateLabel").innerHTML = "Today: "+day+" "+month+" "+dd+", "+yyyy;
    document.getElementById("tithiLabel").innerHTML = panchangamData.tithi;
    document.getElementById("nakshatraLabel").innerHTML = panchangamData.nakshatra;
    document.getElementById("sunLabel").innerHTML = panchangamData.sun;
    document.getElementById("sunriseLabel").innerHTML = panchangamData.sunrise;
    document.getElementById("sun_setLabel").innerHTML = panchangamData.sun_set;
    document.getElementById("amritkalamLabel").innerHTML = panchangamData.amritkalam;
    document.getElementById("durmuhurthaLabel").innerHTML = panchangamData.durmuhurtha;
    document.getElementById("rahukalaLabel").innerHTML = panchangamData.rahukala;
    document.getElementById("yamagandaLabel").innerHTML = panchangamData.yamaganda;
    
    
}