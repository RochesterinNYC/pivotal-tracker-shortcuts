var mouseXPosition = 0;
var mouseYPosition = 0;

var keyCodeCommandMapping = {
  48: 0,
  49: 1,
  50: 2,
  51: 3,
  52: 4,
  53: 5,
  54: 6,
  55: 7,
  56: 8,
  192: -1
}

function keyPress(e) {
  if(e.keyCode in keyCodeCommandMapping && e.ctrlKey){
    var numPoints = keyCodeCommandMapping[e.keyCode];

    var hoveredElement = document.elementFromPoint(mouseXPosition, mouseYPosition);
    var storyElement = findParentWithClass(hoveredElement, 'story model item');
    if(storyElement != null){
      if(!$(storyElement).hasClass('is_estimatable')){
        return;
      }
      if(storyIsOpen(storyElement)){
        var cTag = $(storyElement).attr('data-cid');
        var pointsSelectorId = '#' + numPoints + '_story_estimate_dropdown_' + cTag;
        $(pointsSelectorId)[0].click();
      }
      else {
        if($(storyElement).hasClass('estimate_-1')){
          $(storyElement).find('.estimate_' + numPoints).click();
        }
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
