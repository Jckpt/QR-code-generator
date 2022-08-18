const form = document.getElementById("generate-form");
const qr=document.getElementById("qrcode");

const onGenerateSubmit = (e) =>{
    e.preventDefault();
    clearUI();
    const qrText = document.getElementById('qr-text').value;
    const size = document.getElementById('size').value;
    if(qrText===''){
        alert("Please enter the URL");
    }
    else{
        showSpinner();
        setTimeout(()=>{
            hideSpinner();
            generateQrCode(qrText,size);
            setTimeout(()=>{
                const saveText = qr.querySelector('img').src;
                createSaveButton(saveText);
            },50);
        },1000);
    }
}

const generateQrCode = (qrText,size) =>{
    const qrcode = new QRCode("qrcode", {
        text: qrText,
        width: size,
        height: size,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

const showSpinner = () =>{
    document.getElementById('spinner').style.display = 'block';
}
const hideSpinner = () =>{
    document.getElementById('spinner').style.display = 'none';
}
const clearUI = () =>{
    qr.innerHTML = '';
    const saveButton = document.getElementById('save-link');
    if(saveButton){
        saveButton.remove();
    }
}

const createSaveButton = (saveText) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
    link.href = saveText;
    link.download = 'qrcode';
    link.innerHTML = 'Zapisz Obrazek';
    document.getElementById('generated').appendChild(link);
}

hideSpinner();

form.addEventListener('submit',onGenerateSubmit);