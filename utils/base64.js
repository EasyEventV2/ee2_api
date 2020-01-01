export const getBase64String = (base64Url) => {
  let result = base64Url;
  const b64BasePos = base64Url.indexOf('base64,');
  if (b64BasePos !== -1) {
    result = base64Url.substr(b64BasePos + 7);
  }
  return result;
};
