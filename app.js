const apiKey = "Hmw2jJDn4JJxW5ndszSZudzp";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let uploadedImage = null;

document.getElementById("uploadImage").addEventListener("change", function(e) {
  const reader = new FileReader();
  reader.onload = function(event) {
    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      uploadedImage = img;
    }
    img.src = event.target.result;
  }
  reader.readAsDataURL(e.target.files[0]);
});

function generateThumbnail() {
  const title = document.getElementById("titleText").value;
  if (uploadedImage) {
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);
  }
  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";
  ctx.lineWidth = 3;
  ctx.textAlign = "center";
  ctx.strokeText(title, canvas.width / 2, canvas.height - 40);
  ctx.fillText(title, canvas.width / 2, canvas.height - 40);
}

function removeBackground() {
  if (!uploadedImage) {
    alert("Please upload an image first!");
    return;
  }

  const imageFile = document.getElementById("uploadImage").files[0];
  const formData = new FormData();
  formData.append("image_file", imageFile);

  fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: {
      "X-Api-Key": apiKey
    },
    body: formData
  })
  .then(response => response.blob())
  .then(blob => {
    const img = new Image();
    img.onload = function() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      uploadedImage = img;
    }
    img.src = URL.createObjectURL(blob);
  })
  .catch(err => alert("Error: " + err));
}