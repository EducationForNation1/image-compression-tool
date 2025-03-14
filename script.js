const uploadInput = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const downloadBtn = document.getElementById("download-btn");

uploadInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                // Set canvas dimensions
                const maxWidth = 800;
                const scale = maxWidth / img.width;
                const newWidth = img.width * scale;
                const newHeight = img.height * scale;

                canvas.width = newWidth;
                canvas.height = newHeight;

                // Draw compressed image
                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                // Show download button
                downloadBtn.classList.remove("hidden");
            };
        };

        reader.readAsDataURL(file);
    } else {
        alert("Please upload a valid image file.");
    }
});

downloadBtn.addEventListener("click", () => {
    const compressedImage = canvas.toDataURL("image/jpeg", 0.7); // 70% quality
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = "compressed-image.jpg";
    link.click();
});
