const convertBase64ToBlob = (base64Image: any, mimeType: any): any => {
    const imageData = base64Image.replace(/^data:image\/(png|jpeg|jpg);base64,/, "");
    const decodedImage = atob(imageData);

    const arrayBuffer = new ArrayBuffer(decodedImage.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < decodedImage.length; i++) {
        uint8Array[i] = decodedImage.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: mimeType });
};

export default convertBase64ToBlob;