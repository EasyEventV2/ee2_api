import qrcode from 'qrcode';

async function generateBase64Buffer(obj) {
  const objString = JSON.stringify(obj);
  let base64String = await qrcode.toDataURL(objString);
  const b64BasePos = base64String.indexOf('base64,');
  if (b64BasePos !== -1) {
    base64String = base64String.substr(b64BasePos + 7);
  }

  const dataImage = Buffer.from(base64String, 'base64');
  return dataImage;
}

export default {
  generateBase64Buffer,
};
