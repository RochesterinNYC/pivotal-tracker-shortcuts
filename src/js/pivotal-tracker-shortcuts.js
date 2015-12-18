var mouseXPosition = 0;
var mouseYPosition = 0;

function keyPress(e) {
    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.keyCode == 88) {
      var hoveredElement = document.elementFromPoint(mouseXPosition, mouseYPosition);
      var storyElement = findParentWithClass(hoveredElement, 'story model item');
      if(storyElement != null){
        if(storyIsOpen(storyElement)){
          var cTag = $(storyElement).attr('data-cid');
          var num = 3;
          var pointsSelectorId = '#' + num + '_story_estimate_dropdown_' + cTag;
          $(pointsSelectorId)[0].click();
        }
        else {

        }
      }
    }
}

function storyIsOpen(storyElement){
  var children = storyElement.children;
  var storyOpen = false;

  for(var i = 0; !storyOpen && i < children.length; i++){
    var child = children[i];
    if(child.className.indexOf('edit') != -1){
      storyOpen = true;
    }
  }

  return storyOpen;
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
