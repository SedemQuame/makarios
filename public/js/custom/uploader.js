const CLOUDINARY_URL = ` https://api.cloudinary.com/v1_1/dqv3zrm7e/upload`;
const CLOUDINARY_UPLOAD_PRESETS = `vlp8aifr`;

let element = document.getElementById(`upload_url_holder`);
let uploader1 = document.getElementById(`upload_pdf`);
// let uploader2 = document.getElementById(`uploader2`);
// let uploader2 = document.getElementById(`uploader2`);


function imageUpload(event, element){
    console.log(`File upload`);
    let file = event.target.files[0];
    let formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESETS);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(res => {
        alert(`Successfully uploaded image`);
        element.setAttribute("value", res.data.secure_url);
        console.log(res);
    }).catch(err => {
        alert(`Failed to uploaded image`);
        console.log(err);
    });
}

uploader1.addEventListener(`change`, (event) => {
    let element = document.getElementById('securedUrl1');
    imageUpload(event, element);
});

// uploader2.addEventListener(`change`, (event) => {
//     let element = document.getElementById('securedUrl2');
//     imageUpload(event, element);
// });

// uploader3.addEventListener(`change`, (event) => {
//     let element = document.getElementById('securedUrl3');
//     imageUpload(event, element);
// });