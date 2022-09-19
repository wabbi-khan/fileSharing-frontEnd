const dropZone = document.querySelector(".drop-zone");

// ? jabh bhi drag hoga tw ye chlega

dropZone.addEventListener("dragover", (e) => {
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");
    }
});

// ? jabh bhi drag hatega hoga tw ye chlega

dropZone.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("dragged");
});