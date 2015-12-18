var mouseXPosition = 0;
var mouseYPosition = 0;

var keyCodeCommandMapping = {
  48: 'setStoryPoints',
  49: 'setStoryPoints',
  50: 'setStoryPoints',
  51: 'setStoryPoints',
  52: 'setStoryPoints',
  53: 'setStoryPoints',
  54: 'setStoryPoints',
  55: 'setStoryPoints',
  56: 'setStoryPoints',
  192: 'setStoryPoints',
  73: 'focusStoryTitle',
  85: 'focusStoryDescription',
  75: 'focusStoryComment',
//  76: 'focusStoryLabel',
  84: 'focusStoryTask',
  79: 'focusStoryOwners',
  74: 'startStory'
}

function keyPressDispatcher(e) {
  if(e.keyCode in keyCodeCommandMapping && e.ctrlKey && e.shiftKey){
    var hoveredElement = document.elementFromPoint(mouseXPosition, mouseYPosition);
    var storyElement = $(hoveredElement).closest('.story.model.item');
    if(storyElement == null){
      return;
    }
    var functionName = keyCodeCommandMapping[e.keyCode];
    window[functionName](storyElement, e.keyCode);
  }
  var numPoints = keyCodeCommandMapping[e.keyCode];
}

function startStory(storyElement, focusSelector){
  if(storyIsOpen(storyElement)){
    var startStorySelectorId = '#story_state_button_' + $(storyElement).attr('data-cid') + '_started';
    $(startStorySelectorId)[0].click();
  }
}

function focusStoryOwners(storyElement){
  if(storyIsOpen(storyElement)){
    var ownersSelectorId = '#add_owner_' + $(storyElement).attr('data-cid');
    $(ownersSelectorId)[0].click();
  }
}

function focusStoryTitle(storyElement, keyCode){
  var titleSelectorId = '#story_name_' + $(storyElement).attr('data-cid');
  focusOnField(storyElement, titleSelectorId);
}

function focusOnField(storyElement, focusSelector){
  if(storyIsOpen(storyElement)){
    $(focusSelector).focus();
  }
}

function focusStoryComment(storyElement, keyCode){
  var commentSelectorId = '#comment-edit-' + $(storyElement).attr('data-cid');
  focusOnField(storyElement, commentSelectorId);
}

// Currently, if you focus on labels, other focuses stop working.
// Seems to be due to the way the label dropdown and focuses/keypresses are handled in Tracker.
// function focusStoryLabel(storyElement, keyCode){
  // var labelSelectorId = '#story_add_label_text_' + $(storyElement).attr('data-cid');
  // focusOnField(storyElement, labelSelectorId);
// }

function focusStoryTask(storyElement, keyCode){
  var taskSelectorId = '.add_task';
  focusOnField(storyElement, taskSelectorId);
}

function focusStoryDescription(storyElement, keyCode){
  if(storyIsOpen(storyElement)){
    var cTag = $(storyElement).attr('data-cid');

    var descriptionSelectorId = '#story_pending_description_' + cTag;
    var descriptionElement = $(descriptionSelectorId);

    if(descriptionElement.hasClass('editing')){
      descriptionElement.focus();
    }
    else{
      var descriptionElement = $(storyElement).find('.rendered_description.tracker_markup');
      descriptionElement.click();
    }
  }
}

var keyCodeToPointsMapping = {
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

function setStoryPoints(storyElement, keyCode){
  var numPoints = keyCodeToPointsMapping[keyCode];
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

function storyIsOpen(storyElement){
  return storyElement.find('.edit').length != 0;
}

//Add Event Listener
document.addEventListener('keyup', keyPressDispatcher, false);
//Track mouse position for current story heuristic
document.onmousemove = function(e) {
  mouseXPosition = e.clientX;
  mouseYPosition = e.clientY;
}
