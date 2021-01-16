  function changeColors(color){
    var elements = document.getElementsByClassName('bcolor'); // get all elements
  for(var i = 0; i < elements.length; i++){
    elements[i].style.backgroundColor = color;
  }
    var elements = document.getElementsByClassName('color'); 
  for(var i = 0; i < elements.length; i++){
    elements[i].style.color = color;
  }
  }