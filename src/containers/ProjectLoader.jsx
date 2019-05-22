document.addEventListener("dragstart", event => event.preventDefault());
document.addEventListener("dragover", event => event.preventDefault());
document.addEventListener("dragleave", event => event.preventDefault());
document.addEventListener("drop", event => event.preventDefault());

const getDraggedFile = event => event.dataTransfer.items[0];
const getDroppedFile = event => event.dataTransfer.files[0];
const fileTypeIsSupported = file => {
  return ["text/plain", "text/markdown"].includes(file.type);
};

markdownView.addEventListener("dragOver", event => {
  const file = getDraggedFile(event);
  if (fileTypeIsSupported(file)) {
    markdownView.classList.add("drag-over");
  } else {
    markdownView.classList.add("drag-error");
  }
});

markdownView.addEventListener("dragleave", () => {
  markdownView.classList.remove("drag-over");
  markdownView.classList.remove("drag-over");
});

markdownView.addEventListener("drop", event => {
  const file = getDroppedFile(event);
  if (fileTypeIsSupported(file)) {
    console.log("Dropped!", { file });
  } else {
    alaert("That file type is not supported.");
  }
  markdownView.classList.remove("drag-over");
  markdownView.classList.remove("drag-error");
});
