var allowedKeys = {
    69: 'e',
    77: 'm',
    66: 'b',
    85: 'u',
    83: 's',
    67: 'c',
    65: 'a',
    68: 'd'
  };
  
  var konamiCode = ['e', 'm', 'b', 'u', 's', 'c', 'a', 'd', 'e'];
  
  var konamiCodePosition = 0;
  
  document.addEventListener('keydown', function(e) {

    var key = allowedKeys[e.keyCode];
    var requiredKey = konamiCode[konamiCodePosition];
    if (key == requiredKey) {
      konamiCodePosition++;
  
      if (konamiCodePosition == konamiCode.length) {
        activateCheats();
        konamiCodePosition = 0;
      }
    } else {
      konamiCodePosition = 0;
    }
  });
  
  function activateCheats() {
    alert("Raviolo en catalyse de piège divin !");
    document.location.href = "backrooms.html";
    

    var audio = new Audio('images/rickroll.mp3');
    audio.play();

  }