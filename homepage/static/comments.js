// document.getElementById("navmenu").innerHTML =
// 'add html code here '
$(function() {
  $('#navmenu').load("../navbar.html");
});
// $ is jquery pulled in from the jquery script referenced in comments.html

var databasesize;

function addPic() {
  var elem = document.createElement("img");
  elem.setAttribute("src", "downloads/surfpic.jpg");
  elem.setAttribute("height", "768");
  elem.setAttribute("width", "1024");
  elem.setAttribute("alt", "Flower");
  document.getElementById("picture").appendChild(elem);
}





var btn1 = document.getElementById('btn1');


function clicker() {
  $.get("/commentdata", function(data, status) {
  //  console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);
    var r1data = JSON.stringify(data);
    var r2data = JSON.parse(r1data);
    //console.log(r2data.length);
    document.getElementById("outputDB").innerHTML = '';
    var i = 0;
    while (i < r2data.length) {
      var text = r2data[i].name + ' says ' + r2data[i].comment + '\n'
      document.getElementById("outputDB").append(text);

      //document.getElementById("outputDB").innerHTML = r2data[0].name + ' says ' + r2data[0].comment + '\n' + JSON.stringify(data);
      i++;
    }
    document.getElementById("outputDB").append("_______________________________\n");
    document.getElementById("outputDB").append("REAL DATA: here is what the JSON looks like\n");
    document.getElementById("outputDB").append(JSON.stringify(data[0]));
  });
}
var populated = false;

function loadpic() {
  var piclist;
  $.get("/getimages", function(data, status) {
    var r1data = JSON.stringify(data);
    var r2data = JSON.parse(r1data);
    var i = 0;
    if (!populated) {
      while (i < r2data.length) {
        var x = document.createElement("LI");
        x.innerHTML = '<a href="#">' + r2data[i].filename + '</a>';
        x.addEventListener("click", function() {
          console.log(event.composedPath()[1].innerText);
          //var name = event.path[1].innerText.replace(/\n/g, '');
          var name = event.composedPath()[1].innerText;
          postdata(name);
        });
        document.getElementById("dropmenu").appendChild(x);
        i++;
      }
    }
    populated = true;
  });
}
// the url is where you are making the call. http://54. will call the server.js there
// localhost will make the call to the server.js on localhost
// when working on local host but connect to AWS db, need to set url to localhost
function postdata(nameparam){
 var name = nameparam;
  $.ajax({
    type: "POST",
    url: 'http://54.89.76.137/getimagedata',
    crossDomain: true,
    data: {
      "name": name
    },
    dataType: 'json',
    success: function(response) {
      stringo = '../downloads/' + name;
      $('#img-download').attr('src', '../downloads/'+ stringo);
      // setTimeout(function() {
      //   $('#img-download').attr('src', stringo);
      // }, 1500);
      console.log('Data submit worked. Response was:\n' + response)
    }
  });
}

function submit() {
  console.log($("#name").val());
  console.log($("#comment").val());
  var item1 = $("#name").val();
  var item2 = $("#comment").val();
  var data = {};
  data["name"] = item1;
  data["comment"] = item2;
  //console.log(data.name);

  if (data.name && data.comment) {
    $.ajax({
      type: "POST",
      url: 'http://54.89.76.137/pop',
      data: {
        "name": data.name,
        "comment": data.comment
      },
      dataType: 'json',
      success: function(response) {
        console.log('Data submit worked. Response was:\n' + response)
      }
    });
  }
  $("#name").val('');
  $("#comment").val('');
}

function send(image) {
  if (image) {
    var formdata = new FormData();
    formdata.append('image', image);
    formdata.append('name', image.name);
    $.ajax({
      type: "POST",
      url: 'http://54.89.76.137/imgs',
      data: formdata,
      contentType: false,
      processData: false, // needed saying data sent should not be processed as string or encoded at UTF-8/xml req
      dataType: 'json',
      success: function(response) {
        console.log('Data submit worked. Response was:\n' + response)
      }
    });
  };
}

var firstlabel;

$(document).ready(function() {
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      // regex tutorial to interpert
      label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
      firstlabel = input.val();
    input.trigger('fileselect', [label]);
  });

  $('.btn-file :file').on('fileselect', function(event, label) {

    var input = $(this).parents('.input-group').find(':text'),
      log = label;
    input.val(log);
    console.log(input.length);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      console.log(input.files);
      console.log(input.files[0]);
      var reader = new FileReader();
      var imgurl;
      reader.onload = function(e) {
        $('#img-upload').attr('src', e.target.result);
        imgurl = e.target.result;
        $.get("/getimages", function(data, status) {
          var r1data = JSON.stringify(data);
          var r2data = JSON.parse(r1data);
          databasesize = r2data.length;
          console.log(databasesize);
          if (databasesize < 20) {
            send(input.files[0]);
            //console.log("uploaded");
          }
        });

        // e.target = reader refers to target of the event
        // result is data that readAsDataURL spits out.
        //console.log(e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    };
  };

  $("#imgInp").change(function() {
    readURL(this);
  });



});
