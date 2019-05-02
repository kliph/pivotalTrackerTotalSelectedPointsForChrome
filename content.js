function totalStoryPoints(storyPoints) {
  return storyPoints.reduce(
    function(acc, val) {
      return acc + val
    },
    0
  )
}

function storyPoints(selectedStoryElements) {
  return selectedStoryElements.map(function(element) {
    var points = Math.max(parseInt(element.parentElement.querySelector("span.meta > span").innerHTML, 10), 0);
    return points;
  });
}

function uniqueStories(selectedStoryElements) {
  var uniqueSelectedStories = selectedStoryElements.reduce(function(acc, element) {
    var key = element.parentElement.parentElement.getAttribute("data-id");
    acc[key] = element;
    return acc;
  }, {});

  return Object.values(uniqueSelectedStories);
}

function selectedStories() {
  var selectSelectedStories = document.getElementsByClassName("selector selected")
  var selectedStories = Array.from(selectSelectedStories);

  return uniqueStories(selectedStories);
}

function updateStatusControls() {
  var selectSelectedStoryControlsStatus = document.getElementsByClassName("selectedStoriesControls__status");
  var status = selectSelectedStoryControlsStatus[0];
  if(status) {
    let container = document.getElementsByClassName("__totalStoryPoints")[0];
    var counter = document.createElement("span");
    counter.className = "selectedStoriesControls__counter"
    counter.textContent = totalStoryPoints(storyPoints(selectedStories())).toString();
    var label = document.createElement("span");
    label.className = "selectedStoriesControls__counterLabel";
    label.textContent = "points selected";

    if(container) {
      container.replaceChild(counter, container.firstChild);
      container.replaceChild(label, container.lastChild);
    } else {
      container = document.createElement("span");
      container.className = "__totalStoryPoints";

      container.appendChild(counter);
      container.appendChild(label);

      status.insertBefore(container, status.firstChild);
    }
  }
}

// main
(function run() {
  updateStatusControls()
  setTimeout(run, 1000)
})();
