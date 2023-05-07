// script.js

const viewerCircles = document.getElementById("viewer-circles");
const interactButton = document.getElementById("interact-button");
let isButtonClicked = false;
let circleCount = 0;
const circleCountInput = document.getElementById("circleCount");

circleCountInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    onSetCircleCountClick();
  }
});

interactButton.addEventListener("click", onApplauseClick);

function createViewerCircle() {
  const circle = document.createElement("div");
  circle.classList.add("viewer-circle");

  const size = Math.floor(Math.random() * 8 + 7); // Random size between 7 and 14

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;

  return circle;
}

// function createEmojiSVG() {
//   const emojiSVG = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     "svg"
//   );
//   emojiSVG.setAttribute("xmlns", "http://www.w3.org/2000/svg");
//   emojiSVG.setAttribute("viewBox", "0 0 100 100");

//   const emojiImage = document.createElementNS(
//     "http://www.w3.org/2000/svg",
//     "image"
//   );
//   emojiImage.setAttributeNS(
//     "http://www.w3.org/1999/xlink",
//     "xlink:href",
//     "https://cdn.jsdelivr.net/emojione/assets/svg/1f600.svg"
//   );
//   emojiImage.setAttribute("width", "100%");
//   emojiImage.setAttribute("height", "100%");

//   emojiSVG.appendChild(emojiImage);

//   // Get the position of the viewerCircle
//   const viewerCircle = emojiSVG.parentNode;
//   const viewerCirclePosition = viewerCircle.getBoundingClientRect();

//   // Set the position of the emojiSVG using the same properties as the viewerCircle
//   emojiSVG.style.position = "absolute";
//   emojiSVG.style.top = viewerCirclePosition.top + "px";
//   emojiSVG.style.left = viewerCirclePosition.left + "px";

//   return emojiSVG;
// }

function positionViewerCircle(circle) {
  // Code for positioning a viewer circle inside the viewerCircles element
  const viewerWidth = viewerCircles.offsetWidth;
  const viewerHeight = viewerCircles.offsetHeight;

  viewerCircles.appendChild(circle);

  const circleWidth = circle.offsetWidth;
  const circleHeight = circle.offsetHeight;

  const x = Math.floor(Math.random() * (viewerWidth - circleWidth));
  const y = Math.floor(Math.random() * (viewerHeight - circleHeight));

  const xMax = viewerWidth - circleWidth;
  const yMax = viewerHeight - circleHeight;

  const color = getRandomColor(); // Random color

  circle.style.left = `${Math.min(Math.max(x, 0), xMax - circleWidth)}px`;
  circle.style.top = `${Math.min(Math.max(y, 0), yMax - circleHeight)}px`;
  circle.style.backgroundColor = color;
}

function animateViewerCircle(circle) {
  // Code for animating a viewer circle on interaction
  const duration = Math.floor(Math.random() * 2000 + 1000);
  const delay = Math.floor(Math.random() * 3000);
  const growth = Math.floor(Math.random() * 20 + 15);

  const color = getRandomColor();

  const growAnimation = `
    @keyframes grow {
      0% { transform: scale(1); }
      50% { transform: scale(${1 + growth / 100}); background-color: ${color}; }
      100% { transform: scale(1); }
    }
  `;

  const animationDuration = `${duration}ms`;
  const animationDelay = `${delay}ms`;
  const animationTiming = "ease-in-out";
  const animationIteration = "infinite";
  const animationDirection = "normal";
  const animationFillMode = "forwards";
  const animationName = "grow";

  const styleSheet = document.createElement("style");
  styleSheet.innerHTML = growAnimation;
  document.head.appendChild(styleSheet);

  circle.classList.add("infinite-animation");

  circle.style.animationDuration = animationDuration;
  circle.style.animationDelay = animationDelay;
  circle.style.animationTimingFunction = animationTiming;
  circle.style.animationIterationCount = animationIteration;
  circle.style.animationDirection = animationDirection;
  circle.style.animationFillMode = animationFillMode;
  circle.style.animationName = animationName;
}

function onApplauseClick() {
  isButtonClicked = true;
  const viewerCircles = document.querySelectorAll(".viewer-circle");

  viewerCircles.forEach((circle) => {
    circle.classList.remove("infinite-animation");

    const delay = Math.floor(Math.random() * 3000);

    setTimeout(() => {
      circle.classList.add("applause");

      circle.addEventListener(
        "animationend",
        () => {
          // Remove the circle and create a new circle to replace it
          circle.remove();
          const newCircle = createViewerCircle();
          positionViewerCircle(newCircle);
        },
        { once: true }
      ); // Remove event listener after it runs once
    }, delay);
  });
}

window.onload = () => {
  if (circleCount > 0) {
    for (let i = 0; i < circleCount; i++) {
      const circle = createViewerCircle();
      positionViewerCircle(circle);
      // runAnimationCycle(circle);
    }
  }
};

function getRandomColor() {
  const hexMax = 16777216;
  const color = Math.floor(Math.random() * hexMax).toString(16);
  return "#" + "0".repeat(6 - color.length) + color;
}

function onSetCircleCountClick() {
  const circleCountInput = document.getElementById("circleCount");
  const newCircleCount = parseInt(circleCountInput.value, 10);

  // Validate the input value
  if (isNaN(newCircleCount) || newCircleCount < 1 || newCircleCount > 500) {
    alert("Please enter a valid number between 1 - 500.");
    return;
  }

  // Update the circle count and reload the circles
  circleCount = newCircleCount;

  while (viewerCircles.firstChild) {
    viewerCircles.removeChild(viewerCircles.firstChild);
  }
  window.onload();

  circleCountInput.value = "";
}
