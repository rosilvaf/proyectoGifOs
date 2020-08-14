//form1
document.querySelector(".autocomplete-content").style.display = "none";
const APIurl = "https://api.giphy.com/v1/gifs/";
const APIkey = "xBWsI1LWcGLChS6L9d5ucODsG0BfkNEx";


// Resultados de busqueda

function getSearchResults() {
  document.querySelector(".search-results").style.display = "block";
  search = document.getElementById("search").value;
  const found = fetch(`${APIurl}search?q=${search}&api_key=${APIkey}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      innerGifs = document.getElementById("inner_gifs");
      innerGifs.innerHTML = "";
      document.getElementById("all").style.display="none";
      for (var i = 0; i < 20; i++) {
        gifID = data.data[i].id;
        imgURL = data.data[i].images.original.url;
        gifDiv = document.createElement("div");
        gifDiv.className = "gif";
        innerGifs.appendChild(gifDiv);
        imgChild = document.createElement("img");
        imgChild.className = "img-gif";
        imgChild.src = imgURL;
        titleDiv = document.createElement("div");
        titleDiv.className = "title-gif";
        titleDiv.id = `gif-${i + 1}`;

        gifDiv.append(imgChild, titleDiv);

        titulo_gif = data.data[i].title.trim().split(" ");
        titulo_gif = titulo_gif.filter(del => del !== "GIF");
        for (var j = 0; j <= 2; j++) {
          if (titulo_gif[j] !== undefined && titulo_gif[j] !== "") {
            spanChild = document.createElement("span");
            spanChild.innerHTML = `#${titulo_gif[j]}`;
            document.getElementById(`gif-${i + 1}`).appendChild(spanChild);
          }
        }
        saveBtnChild = document.createElement("p");
        saveBtnChild.className = "save-gif";
        saveBtnChild.id = gifID;
        saveBtnChild.innerHTML = `<img title='Guardar Gifos'`;
        saveBtnChild.onclick = function(e) {
          fetch(`${APIurl}${this.id}?&api_key=${APIkey}`)
            .then(response => {
              return response.json();
            })
            .then(data => {
              localStorage.setItem(`gif-${this.id}`, JSON.stringify(data.data));
              showLsItems();
            });
          displayPopup("Gif guardado!");
          e.stopPropagation();
        };
        gifDiv.append(saveBtnChild);
      }
      document.querySelector(".autocomplete-content").style.display = "none";
      document.querySelector(".suggested").style.display = "none";
      document.querySelector(".trendings").style.display = "none";
      
    })
    .catch(error => {
      return error;
    });
  return found;
}

// Crea popup

function displayPopup(text) {
  let popUp = document.createElement("div");
  popUp.className = "popup";
  popUp.innerHTML = text;
  document.body.appendChild(popUp);
  setTimeout(() => {
    document.body.removeChild(popUp);
  }, 1200);
}

// Autocompletar

function resultadoSugerido() {
  autoComp = document.querySelector(".autocomplete-content");
  autoComp.style.display = "block";
  search = document.getElementById("search").value;
  if (search === "") {
    autoComp.style.display = "none";
  }
  fetch(`${APIurl}search?q=${search}&api_key=${APIkey}&limit=3`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      autoComp.innerHTML = "";
      for (let i = 0; i < data.data.length; i++) {
        imgTITLE = data.data[i].title;
        if (imgTITLE !== "") {
          imgURL = data.data[i].bitly_url;
          sug = document.createElement("p");
          autoComp.appendChild(sug);
          innerS = `<a href="${imgURL}" target='_blank'>${imgTITLE}</a>`;
          sug.innerHTML = innerS;
        }
      }
    });
}

// Limpiar resultados


// Random gifs

function suggestedGifs(gif) {
  fetch(`${APIurl}search?q=${gif}&api_key=${APIkey}&limit=1`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let gif_box = document.createElement("div");
      gif_box.className = "gif-box";
      gif_box.innerHTML = `
        <div class='gif-title'>
          <span>#${gif}</span><span style='float: right;'><img src='./images/button3.svg' /></span>
        </div>
        <div class='gif-img'>
          <img src='${data.data[0].images.original.url}'>
          <span class='btn-gif'><a href='${data.data[0].bitly_url}' target='_blank'>Ver más...</a></span>
        </div>
      `;
      document.getElementById("gif_suggested").append(gif_box);
    });
}



window.onload=function(){
    getGyphyData();
    getGyphy();
    getGif();
    getGifo();
  
    }
var j="Jonathan_van_ness";
var s="sailor_mercury";
var f="fab_five";
var u="Unicorns_&_Rainbows";
function getGyphyData(){
    var more='http://api.giphy.com/v1/gifs/search?q='+ j + '&api_key=' + APIkey;
   fetch(more)
   .then(data=>data.json())
   .then(res=>{
       console.log(res)
    var arrayOfGifs=res.data
    var firstItem=arrayOfGifs[0]
    var giphyLink=firstItem.images.fixed_width.url
    document.getElementById('Jonathanvanness').setAttribute('src', giphyLink)
    })
   .catch(error=>console.log(error))
}
function getGyphy(){
   var more='http://api.giphy.com/v1/gifs/search?q='+ s + '&api_key=' + APIkey;
   fetch(more)
   .then(data=>data.json())
   .then(res=>{
       console.log(res)
    var arrayOfGifs=res.data
    var firstItem=arrayOfGifs[0]
    var giphyLink=firstItem.images.fixed_width.url
    document.getElementById('SailorMercury').setAttribute('src', giphyLink)
    })
   .catch(error=>console.log(error))}

   function getGif(){
    var lookfor='http://api.giphy.com/v1/gifs/search?q='+ f + '&api_key=' + APIkey;
    fetch(lookfor)
    .then(data=>data.json())
    .then(res=>{
        console.log(res)
     var arrayOfGifs=res.data
     var firstItem=arrayOfGifs[0]
     var giphyLink=firstItem.images.fixed_width.url
     document.getElementById('FabFive').setAttribute('src', giphyLink)
     })
    .catch(error=>console.log(error))
   }
   function getGifo(){
    var more='http://api.giphy.com/v1/gifs/search?q='+ u + '&api_key=' + APIkey;
    fetch(more)
    .then(data=>data.json())
    .then(res=>{
        console.log(res)
     var arrayOfGifs=res.data
     var firstItem=arrayOfGifs[0]
     var giphyLink=firstItem.images.fixed_width.url
     document.getElementById('UnicornsRainbows').setAttribute('src', giphyLink)
     })
    .catch(error=>console.log(error))
   }
   //close Windows with GIfs
   function remove1(){
    document.getElementById('Jonathanvanness').style.display="none"
    document.getElementById('look_1').style.display="none"
    document.getElementById('close1').style.display="none"
    document.getElementById('close_1').style.display="none"
   }
   function remove2(){
    document.getElementById('SailorMercury').style.display="none"
    document.getElementById('look_2').style.display="none"
    document.getElementById('close2').style.display="none"
    document.getElementById('close_2').style.display="none"
   }
   function remove3(){
    document.getElementById('FabFive').style.display="none"
    document.getElementById('look_3').style.display="none"
    document.getElementById('close3').style.display="none"
    document.getElementById('close_3').style.display="none"
   }
   function remove4(){
    document.getElementById('Unicorns&Rainbows').style.display="none"
    document.getElementById('look_4').style.display="none"
    document.getElementById('close4').style.display="none"
    document.getElementById('close_4').style.display="none"
   }

//trending
const path='http://api.giphy.com/v1/gifs/trending?api_key=' + APIkey
const resultsTInfo =document.getElementById('resultsT')
fetch (path).then(function(res){
    return res.json ()})
    .then (function(json){
    console.log(json.data[0].images.fixed_width.url)
   
    let resultsTHTML= ''

    json.data.forEach(function(obj){
    console.log(obj)

    const url= obj.images.fixed_width.url
    const width=obj.images.fixed_width.url.width
    const height=obj.images.fixed_width.url.height
    const title= obj.title
   resultsTHTML+=`<img 
    class="item"
    src="${url}" 
    width="${width}" 
    height="${height}"
    alt="${title}">`
    })
    resultsTInfo.innerHTML=resultsTHTML
   
}).catch (function(err){
    console.log (err.message)
})



 
//buttons Look
function search1 (){
    
 const path='http://api.giphy.com/v1/gifs/search?q='+ j + '&api_key=' + APIkey

fetch (path).then(function(res){
    return res.json ()
}).then (function(json){
    console.log(json.data[0].images.fixed_width.url)
   
    let resultsTHTML= ''

    json.data.forEach(function(obj){
    console.log(obj)

    const url= obj.images.fixed_width.url
    const width=obj.images.fixed_width.url.width
    const height=obj.images.fixed_width.url.height
    const title= obj.title
    resultsTHTML+=`<img 
    class="item"
    src="${url}" 
    width="${width}" 
    height="${height}"
    alt="${title}">`
    })
    

    
    resultsTInfo.innerHTML=resultsTHTML
   
}).catch (function(err){
    console.log (err.message)
})
}
function search2 (){
    
    const path='http://api.giphy.com/v1/gifs/search?q='+ s + '&api_key=' + APIkey
   
   fetch (path).then(function(res){
       return res.json ()
   }).then (function(json){
       console.log(json.data[0].images.fixed_width.url)
      
       let resultsTHTML= ''
   
       json.data.forEach(function(obj){
       console.log(obj)
   
       const url= obj.images.fixed_width.url
       const width=obj.images.fixed_width.url.width
       const height=obj.images.fixed_width.url.height
       const title= obj.title
       resultsTHTML+=`<img 
       class="item"
       src="${url}" 
       width="${width}" 
       height="${height}"
       alt="${title}">`
       })
      
   
     
       
       resultsTInfo.innerHTML=resultsTHTML
      
   }).catch (function(err){
       console.log (err.message)
   })
   }
   function search3 (){
    
    const path='http://api.giphy.com/v1/gifs/search?q='+ f + '&api_key=' + APIkey
   
   fetch (path).then(function(res){
       return res.json ()
   }).then (function(json){
       console.log(json.data[0].images.fixed_width.url)
      
       let resultsTHTML= ''
   
       json.data.forEach(function(obj){
       console.log(obj)
   
       const url= obj.images.fixed_width.url
       const width=obj.images.fixed_width.url.width
       const height=obj.images.fixed_width.url.height
       const title= obj.title
       resultsTHTML+=`<img 
       class="item"
       src="${url}" 
       width="${width}" 
       height="${height}"
       alt="${title}">`
       })
      
   
    
       resultsTInfo.innerHTML=resultsTHTML
      
   }).catch (function(err){
       console.log (err.message)
   })
   }
   function search4 (){
    
    const path='http://api.giphy.com/v1/gifs/search?q='+ u+ '&api_key=' + APIkey
   
   fetch (path).then(function(res){
       return res.json ()
   }).then (function(json){
       console.log(json.data[0].images.fixed_width.url)
      
       let resultsTHTML= ''
   
       json.data.forEach(function(obj){
       console.log(obj)
   
       const url= obj.images.fixed_width.url
       const width=obj.images.fixed_width.url.width
       const height=obj.images.fixed_width.url.height
       const title= obj.title
       resultsTHTML+=`<img 
       class="item"
       src="${url}" 
       width="${width}" 
       height="${height}"
       alt="${title}">`
       })

       resultsTInfo.innerHTML=resultsTHTML
      
   }).catch (function(err){
       console.log (err.message)
   })
   }
  
   //for buttons Dark-light Mode
   function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  
  window.onclick = function(event) { 
    if (!event.target.matches('.dropbtn')){
     var dropdowns = document.getElementsByClassName("dropdown-content");
    var i; for (i = 0; i < dropdowns.length; i++) { 
      var openDropdown = dropdowns[i];
       if (openDropdown.classList.contains('show')) 
    { openDropdown.classList.remove('show');
   } 
  } 
  } 
  } 
  //Change Themes
 
  //Autocomplete searcher
  function resultadoSugerido() {
    autoComp = document.querySelector(".autocomplete-content");
    autoComp.style.display = "block";
    search = document.getElementById("search").value;
    if (search === "") {
      autoComp.style.display = "none";
    }
    fetch(`${APIurl}search?q=${search}&api_key=${APIkey}&limit=3`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        autoComp.innerHTML = "";
        for (let i = 0; i < data.data.length; i++) {
          imgTITLE = data.data[i].title;
          if (imgTITLE !== "") {
            imgURL = data.data[i].bitly_url;
            sug = document.createElement("p");
            autoComp.appendChild(sug);
            innerS = `<a href="${imgURL}" target='_blank'>${imgTITLE}</a>`;
            sug.innerHTML = innerS;
          }
        }
      });
  }
  
//for Scrolling
var mybutton = document.getElementById("go-up");

// When the user scrolls down 120px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


    