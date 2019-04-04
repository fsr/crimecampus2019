//source: https://codepen.io/chriscoyier/pen/zbakI

var video = document.querySelector('video'),
    button = document.querySelector('button'),
    current = document.querySelector('button span'),
    filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement'],
    i = 0;

button.addEventListener('click', function(){
  
  current.innerHTML = filters[i];
  video.style.webkitFilter='url(#'+filters[i]+')';
  video.style.mozFilter='url(#'+filters[i]+')';
  video.style.filter='url(#'+filters[i]+')';
  
  i++;
  
  if (i>=filters.length) i=0;
  
}, false);

myRange.addEventListener("change", function(){
  var x = document.getElementById("myRange").value;
  var blur = document.getElementById("blurId");
  var svg = document.getElementById("image");
  
  console.log(x);
  blur.setAttribute("stdDeviation", x);
  svg.setAttribute("width", svg.getBox.width());
}, false);