
console.log("I got here")
function fetchIssues () {
   console.log("Console Message");
    var formFields = document.getElementById('formFields');
    
    var intKey = document.getElementById('intKey').value;
    var widgetURL = document.getElementById('widgetURL').value;
    var widgetID = document.getElementById('widgetID').value;

    console.log(intKey);
    console.log(widgetURL);
    console.log(widgetID);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://api.na2.echosign.com:443/api/rest/v6/widgets/" + widgetID + "/formData", false ); 
    xmlHttp.setRequestHeader("Authorization", "Bearer " + intKey);
    xmlHttp.send( null );
    var responseByteArray = xmlHttp.response;
    console.log(xmlHttp.responseText);
    console.log(responseByteArray);
    var fieldArray = CSVToArray(responseByteArray, ",");
    console.log(CSVToArray(fieldArray, ","));
    formFields.innerHTML = '';
   //formFields.innerHTML +=   '<div class="well">';
    for (var i = 0; i < fieldArray.length; i++) {
        if (fieldArray[i] == "agreementId" || fieldArray[i] == "completed" || fieldArray[i] == "widget signed/approved" || fieldArray[i] == "email verified") {
            continue;
        }
      //alert(fieldArray[i]);
      formFields.innerHTML += '<div class="form-group">' + 
      '<label for="formFields">' + fieldArray[i] + '</label>' + 
      '<input type="text" class="form-control" id="' + fieldArray[i] + '" placeholder="' + fieldArray[i] + '">' + 
    '</div>';
    }
      formFields.innerHTML += 
      '<a href="#" class="btn btn-success" onclick="setDone()">Done</a>   ' + 
      '<a href="#" class="btn btn-danger" onclick="setClose()">Close</a>'; 
  }



      function setDone () {
        var widgetURL = document.getElementById('widgetURL').value;
        var elements = document.getElementById("formFields").elements;
        var counter = 0;
        for (var i = 0, element; element = elements[i++];) {
            if (element.value === "")
            {
                console.log("it's an empty textfield");
            }
            else  {
            console.log(element.id + ": " + element.value);
                if (counter == 0) {
                    widgetURL +=  "#" + element.id + "=" + element.value;
                } else {
                    widgetURL +=  "&" + element.id + "=" + element.value;
                }     
                counter++;     
              }
        }
        window.open(widgetURL, '_blank');
      }

      function setClose () {
        var formFields = document.getElementById('formFields');    
        formFields.innerHTML = '';
        console.log("Close clicked!");
      }


    function CSVToArray( strData, strDelimiter ){
      strDelimiter = (strDelimiter || ",");

      var objPattern = new RegExp(
          (
              "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
              "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
              "([^\"\\" + strDelimiter + "\\r\\n]*))"
          ),
          "gi"
          );

      var arrData = [];

      var arrMatches = null;

      while (arrMatches = objPattern.exec( strData )){
          var strMatchedDelimiter = arrMatches[ 1 ];
          if (
              strMatchedDelimiter.length &&
              strMatchedDelimiter !== strDelimiter
              ){
                break;
          }

          var strMatchedValue;

          if (arrMatches[ 2 ]){
              strMatchedValue = arrMatches[ 2 ].replace(
                  new RegExp( "\"\"", "g" ),
                  "\""
                  );

          } else {
              strMatchedValue = arrMatches[ 3 ];

          }
          arrData.push( strMatchedValue );
      }

      return( arrData );
  }