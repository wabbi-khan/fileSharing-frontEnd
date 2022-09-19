const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileinput");
const bgProgress = document.querySelector(".bg-progress");
const percentContainer = document.querySelector("#percent");
const baseURL = "https://innshare.herokuapp.com";
const uploadURL = `${baseURL}/api/files`;
// ? jabh bhi drag hoga tw ye chlega

dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (!dropZone.classList.contains("dragged")) {
        dropZone.classList.add("dragged");
    }
});

// ? jabh bhi drag hatega hoga tw ye chlega

dropZone.addEventListener("dragleave", (e) => {
    dropZone.classList.remove("dragged");
});

// ? jabh bhi drop ho jayga tw ye chlega

dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("dragged");
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
        fileInput.files = files;
        uploadFile();
    }
});

// * jab bhi browse button py click hoga ye chlega
browseBtn.addEventListener("click", () => {
    fileInput.click();
});
fileInput.addEventListener("change", () => {
    uploadFile();
});
const uploadFile = () => {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile", file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
        }
    };
    xhr.upload.onprogress = updateProgress;
    xhr.open("POST", uploadURL);
    xhr.send(formData);
};
const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentContainer.innerHTML = percent;
};