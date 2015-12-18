var mouseXPosition = 0;
var mouseYPosition = 0;

function keyPress(e) {
    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.keyCode == 88) {
      var hoveredElement = document.elementFromPoint(mouseXPosition, mouseYPosition);
      var storyElement = findParentWithClass(hoveredElement, 'story');
      if(storyElement != null){

      }
    }
}

function findParentWithClass(element, parentClass){
  var parentElement = element.parentElement;
  if(parentElement == null){
    console.log('No parents with ', parentClass, ' were found.');
    return null;
  }
  else if(parentElement.className.indexOf(parentClass) != -1){
    return parentElement;
  }
  else {
    return findParentWithClass(parentElement, parentClass);
  }
}
//Add Event Listener
document.addEventListener('keyup', keyPress, false);
//document.elementFromPoint(x, y);

document.onmousemove = function(e) {
  mouseXPosition = e.clientX;
  mouseYPosition = e.clientY;
}
