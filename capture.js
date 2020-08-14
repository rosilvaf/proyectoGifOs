var video = document.getElementById('video');
let buffer = document.querySelectorAll(".progress-bar-item");
let buttons=document.getElementById('repeat').style.display="none";
let button=document.getElementById('upload').style.display="none";
let minutesload=document.getElementById('secondsloading').style.display="none";
let recording=false;
document.getElementById("check").style.display="none";
document.getElementById("btn-stop").style.display = "none";
document.getElementById("gif-preview-container").style.display = "none";
var recorder;

function getStream(){
  document.getElementById('MyGifs').style.display="none";
  document.getElementById("gif-start").style.display="none";
  document.getElementById('savedgifos').style.display="none";
  document.getElementById("check").style.display="block";
  navigator.mediaDevices.getUserMedia({ video: true }).then(stream=>{video.srcObject=stream;
  }).catch(error=>{
      alert('Unable to capture your camera. Please check console logs.');
      console.error(error);
     
  })};


function startRecording() {

  recording=true;
   
      recorder = RecordRTC(video.srcObject, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width:324,
      hidden:240,
      
      onGifRecordingStarted: function () {
        console.log("started");
      }
    });
    document.getElementById("butons").style.display = "none";
    document.getElementById("btn-stop").style.display = "block";
    recorder.startRecording();
    showDuration();
    document.getElementById('secondsloading').style.display="block";
    document.getElementById("begin").innerHTML = "Capturando Tu Guifo";
   document.getElementById("gif-record").style.display="block";  
  }
   

  function stopRecording() {
    video.srcObject.getTracks().forEach(function (track) {
      track.stop();

    });
    recorder.stopRecording(function () {
      recording = false;
    
        // hide the video and show the  preview
      video.style.display = "none";
    
      document.getElementById("gif-preview-container").style.display = "block";
      preview = document.getElementById("gif-preview");
   
      preview.src = URL.createObjectURL(recorder.getBlob());
    
      document.getElementById("begin").innerHTML = "Vista Previa";
      document.getElementById("repeat").style.display = "block";
      document.getElementById("upload").style.display = "block";
      let form = new FormData();
      form.append("file", recorder.getBlob(), "myGif.gif");
  
      document.getElementById("upload").addEventListener("click", () => {
        uploadGif(form);
      });
    
    });
    document.getElementById("btn-stop").style.display = "none";
   
  }
  function uploadGif(gif) {
    document.getElementById('gif-preview-container').innerHTML = `
    <div class='uploading-gif'>
      <img src="./images/globe_img.png">
      <p class='uploading-gif-title'>Estamos subiendo tu guifo...<p>
      <div class="progress-bar" id="progress-bar">
        <ul>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <p class='time-left'>Tiempo restante: <span style='text-decoration: line-through'>38 años</span> algunos segundos</p>
    </div>
    `;
    animateProgressBar();
    document.querySelector('.btns-upload-gif').innerHTML = `
    <button class="btn-create-gif repeat push" onclick="location.href='capture.html'"><span class="cancelupload">Cancelar</span></button>
    `
    
    fetch(
      "https://upload.giphy.com/v1/gifs?api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx",
      {
        method: "POST",
        body: gif
      }
    )
      .then(response => {
        if (response.status === 200) {
          console.log('Gif subido!');
          return response.json();
        } else {
          console.log('error.');
        }
      })
      .then(data => {
        console.log(data);
        fetch(
          `https://api.giphy.com/v1/gifs/${data.data.id}?&api_key=xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx`
        )
          .then(response => {
            return response.json();
          })
          .then(data => {
            localStorage.setItem(
              `mygif-${data.data.id}`,
              JSON.stringify(data.data)
            );
            let alertGif = document.createElement('div');
            alertGif.className = 'alert-gif';
            alertGif.innerHTML = `
            <p class='title-modal'> Guifo subido con éxito! <span style='float: right'><img id='closeModal' src="./images/close.svg"></span></p>
            <div class='content-modal'>
              <img class='gif-modal' src='${data.data.images.original.url}'>
              <div class='gif-modal-btns'>
              <h2>Guifo creado con éxito</h2>
                <button class="btn">Copiar Enlace Guifo</button>
                <button class="btn">Descargar Guifo</button>
                <a href="mygifos.html"><button class="uploadready">Listo</button></a>
              </div>
            <div>
            `;
            document.querySelector('.content').style.filter = 'grayscale(70%) blur(2px)';
            document.getElementById('welcome').style.filter = 'grayscale(70%) blur(2px)';
            document.body.append(alertGif);
            document.getElementById('closeModal').addEventListener('click', () => {
              document.querySelector('.alert-gif').style.display = 'none';
              window.location.href = "./mygifos.html";
              document.getElementById('MyGifs').style.display="block";
              document.getElementById("gif-start").style.display="block";
              document.getElementById('savedgifos').style.display="block";
            });
          });
      });
  }
  
    let clock= document.getElementById('secondsloading');
    let showDuration = () => {
      let mseconds= 0;
      let seconds = 0;
      
          
        let timer = setInterval(() => {
          if (recording) {
              if (mseconds < 60) {
                  if (mseconds <= 9) {
                      mseconds = '0' + mseconds;
                  }
                  clock.style.display="block";

                  clock.innerHTML = `00:0${seconds}:${mseconds}`;
                  
                  mseconds++;
              } else {
                  seconds++;
                  mseconds = 0;
              }
          } else {
              clearInterval(timer)
          }
      }, 10);
    }
    
    
    function animateProgressBar() {
      document.querySelector('.progress-bar').style.display = 'inline-block';
      let progressBar = document.getElementById('progress-bar');
      let liCounter = 0;
      setInterval(function() {
        progressBar.querySelectorAll('li')[liCounter].style.display = 'inline-block';
        if (liCounter >= 15) {
          progressBar.querySelectorAll('li').forEach(element => {
            element.style.display = 'none';
          })
          liCounter = 0;
        }else{
          liCounter++;
        }
      }, 400);
    };