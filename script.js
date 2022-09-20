const dropZone = document.querySelector(".drop-zone");
const browseBtn = document.querySelector(".browseBtn");
const fileInput = document.querySelector("#fileinput");
const bgProgress = document.querySelector(".bg-progress");
const progressBar = document.querySelector(".progress-bar");
const percentContainer = document.querySelector("#percent");
const progressContainer = document.querySelector(".progress-container");
const fileUrl = document.querySelector("#fileUrl");
const sharingContainer = document.querySelector(".sharing-container");
const copyBtn = document.querySelector("#copyBtn");
const emailForm = document.querySelector("#emailForm");
// ?============== BACK-END API===========
const baseURL = "https://innshare.herokuapp.com";
const uploadURL = `${baseURL}/api/files`;
const emailURL = `${baseURL}/api/files/send`;

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
// ?====================
copyBtn.addEventListener("click", () => {
    fileUrl.select();
    document.execCommand("copy");
});
fileInput.addEventListener("change", () => {
    uploadFile();
});
const uploadFile = () => {
    progressContainer.style.display = "block";
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile", file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            console.log(xhr.response);
            showLink(JSON.parse(xhr.response));
        }
    };
    xhr.upload.onprogress = updateProgress;
    xhr.open("POST", uploadURL);
    xhr.send(formData);
};
const updateProgress = (e) => {
    const percent = Math.round((e.loaded / e.total) * 100);
    // console.log(percent);
    bgProgress.style.width = `${percent}%`;
    percentContainer.innerText = percent;
    progressBar.style.transform = `scaleX(${percent}%)`;
};
const showLink = ({ file: url }) => {
    console.log(url);
    fileInput.value = "";
    emailForm[2].removeAttribute("disabled", "true");
    sharingContainer.style.display = "block";
    progressContainer.style.display = "none";
    fileUrl.value = url;
};
emailForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const url = fileUrl.value;
    const formData = {
        uuid: url.split("/").splice(-1, 1)[0],
        emailTo: emailForm.elements["to-email"].value,
        emailFrom: emailForm.elements["from-email"].value,
    };
    emailForm[2].setAttribute("disabled", "true");
    console.table(formData);
    fetch(emailURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            if (data.success) {
                showToast("Email Sent");
                sharingContainer.style.display = "none"; // hide the box
            }
        });
});