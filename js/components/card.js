import { formatRelativeTime } from "../utils/dateFormatter.js";

export function createCardNote(date, content) {
  const button = document.createElement("button");
  button.classList.add("card");
  button.style.position = "relative";

  const title = createCardTitle(date);
  const cardContent = createCardContent(content);
  const gradient = createCardGradient();

  button.appendChild(title);
  button.appendChild(cardContent);
  button.appendChild(gradient);

  return button;
}

function createCardTitle(date) {
  const span = document.createElement("span");
  span.classList.add("card-title");
  span.textContent = formatRelativeTime(date);
  return span;
}

function createCardContent(content) {
  const div = document.createElement("div");
  div.classList.add("card-content");
  div.textContent = content;
  return div;
}

function createCardGradient() {
  const div = document.createElement("div");
  div.classList.add("gradient");
  return div;
}
