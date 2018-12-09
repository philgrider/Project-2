/* eslint-disable no-irregular-whitespace */
function imageToBase64(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      // reader.result is the bsae64 string representing the file blob aka image data
      // will be passed to .then()
      resolve(reader.result);
    };
    reader.onerror = function(error) {
      reject(error);
    };
  });
}

// function displayImgInBody(base64ImgStr) {
//   // create an image tag with data from the base 64 image
//   var img = $("<img />");
//   img.src = base64ImgStr;

//   //not sure if it should be "data" or "img"
//   //Creates an empty canvas element
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;

//   //Copy the image contents to the canvas

//   var context = canvas.getContext("2d");
//   context.drawImage(img, 0, 0);

//   //This will hold a base64 representation of the image
//   var dataUrl = canvas.toDataURL("image/jpg");

//   // Append the image to the DOM
//   var newImg = document.createElement("img");
//   newImg.src = dataUrl;
//   document.body.appendChild(newImage);
// }

function displayImgInBody2(base64ImgStr) {
  // Create elements
  var img = new Image();
  var canvas = document.createElement("canvas");

  // Set the image source
  img.src = base64ImgStr;
  // eslint-disable-next-line no-irregular-whitespace
  // eslint-disable-next-line no-irregular-whitespace

  // When the image loads
  img.onload = function() {
    canvas.height = img.height;
    canvas.width = img.width;

    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);

    // This will hold a base64 representation of the image
    var dataUrl = canvas.toDataURL("image/jpg");

    // Append the image to the DOM
    var newImg = document.createElement("img");
    newImg.src = dataUrl;
    document.body.appendChild(newImage);
  };
}

$(document).ready(function() {
  $("#add-item").on("submit", function(event) {
    //Make sure to preventDefault on a submit event.
    event.preventDefault();

    // var that = $(this);
    // var img64 = " ";
    var file = document.querySelector("input[type='file']").files[0]; //gets file from html

    imageToBase64(file)
      .then(function(data) {
        // img64 = data;
        var itemInfo = {
          uname: $("uname-read").val(),
          item: $("#item-name").val(),
          description: $("#item-description").val(),
          price: $("#item-price").val(),
          // data = the image as base64
          image: data
        };
        displayImgInBody2(data);
        console.log("Before ajax");

        $.ajax({
          method: "POST",
          url: "/api/item",
          data: itemInfo
        })
          .then(function(data) {
            console.log("Response from the server:", data);
            // reload page to display images in proper column
            location = reload();
          })
          .catch(function(error) {
            console.log(
              "There was an error with PUT request to the backend",
              error.message
            );
          });
      })
      .catch(function(error) {
        console.log("Error converting image to base 64: " + error.message);
      });
  });

  //   $("#create-item").on("click", function(e) {
  //     // uname
  //     var test = $("#uname-read").val();
  //     console.log(test);
  //   });;
});

//       // TODO: do we need this?
//       // displayImgInBody(data);
//     });
//   });
//   $("#add-item").on("submit", function(event) {
//     event.preventDefault();
//     var file = document.querySelector("input[type='file']").files[0]; //gets file from html

//   convertImgToBase64(file)
// .then(function(base64Data) {