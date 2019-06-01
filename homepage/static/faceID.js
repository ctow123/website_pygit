// document.getElementById("navmenu").innerHTML =
// 'add html code here '

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
          downloadimg(name);
        });
        document.getElementById("dropmenu").appendChild(x);
        i++;
      }
    }
    populated = true;
  });
}
// This downloads the image for the website

// the url is where you are making the call. http://54. will call the server.js there
// localhost will make the call to the server.js on localhost
// when working on local host but connect to AWS db, need to set url to localhost
function downloadimg(nameparam) {
  var name = nameparam;
  $.ajax({
    type: "POST",
    url: 'http://127.0.0.1:8000/downloadimgs',
    crossDomain: true,
    data: {
      "name": name
    },
    dataType: 'json',
    success: function(response) {
      stringo = '../downloads/' + name;
      $('#img-download').attr('src', '../downloads/' + stringo);
      // setTimeout(function() {
      //   $('#img-download').attr('src', stringo);
      // }, 1500);
      console.log('Data submit worked. Response was:\n' + response)
    }
  });
}

// send image to server for processing / storage
function send(image) {
  if (image) {
    var formdata = new FormData();
    formdata.append('image', image);
    formdata.append('name', image.name);
    console.log(image.name)
    $.ajax({
      type: "POST",
      url: 'http://localhost:8000/sendimgs/',
      data: formdata,
      contentType: false,
      processData: false, // needed saying data sent should not be processed as string or encoded at UTF-8/xml req
      dataType: 'json',
      success: function(response) {
        console.log('Data submit worked. Response was:\n' + JSON.stringify(response))
        $('#img-download').attr('src', '/pics/'+ image.name.split('.')[0]  +image.name.split('.')[1]);
      }
    });
  };
}

$(document).ready(function() {
  // :file calls fileselect
  // does useless stuff just puts name next to file box
  // this fires when there is a change that is btn-file being file selected
  // document will detect user on change, but then has to trigger the actual event as events can't be triggered w/o user change
  $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
      // regex tutorial to interpert
      label = input.val().replace(/\\/g, '/').replace(/.*\//, ''),
      // does firstlabel need to be declared first??
      firstlabel = input.val();
    input.trigger('fileselect', [label]);
  });
  // this fires when button is file selected
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
        send(input.files[0]);
        // file limit / size checks
        //  $.get("/getimages", function(data, status) {
        //   var r1data = JSON.stringify(data);
        //   var r2data = JSON.parse(r1data);
        //   databasesize = r2data.length;
        //   console.log(databasesize);
        //   if (databasesize < 20) {
        //     send(input.files[0]);
        //     //console.log("uploaded");
        //   }
        // });

        // e.target = reader refers to target of the event
        // result is data that readAsDataURL spits out.
        // console.log(e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    };
  };


  $("#imgInp").change(function() {
    readURL(this);
    // need wait before calling second function to see if server is done
    //downloadimg(this.files[0].name);
  });


});
