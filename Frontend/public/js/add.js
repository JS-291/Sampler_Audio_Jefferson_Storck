let form; 

window.onload = async () => {
    form=document.getElementById("addPresetForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const files = document.getElementById("audioFiles").files;
        let res={
            name: document.getElementById("presetName").value,
            type: document.getElementById("presetType").value,
            isFactoryPresets: document.getElementById("factoryCheck").checked,
            samples: []
        };
        for (let i = 0; i < files.length; i++) {
            res.samples.push({
                url: `./${res.name}/${files[i].name}`,
                name: files[i].name.replace(/\.[^/.]+$/, "")
            });
        }
        uploadPreset(res, files).then(res => {
            if (res.ok) {
                console.log("Preset uploaded successfully!");
                window.location.href = "index.html";
            } else {
                console.error("Failed to upload preset.");
            }
        }).catch(err => {
            console.error("Error uploading preset:", err);
        });
    });
}

function uploadPreset(data, files) {
    let formData = new FormData();
    formData.append("data", JSON.stringify(data));
    for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
    }
    return fetch("http://localhost:8010/api/presets", {
        method: "POST",
        body: formData
    });
}