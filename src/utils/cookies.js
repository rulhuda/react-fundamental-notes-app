function setCookie(cookieName, cookieValue, expire) {
  const dayData = new Date();
  dayData.setTime(dayData.getTime() + (expire * 24 * 60 * 60 * 1000));

  const expired = `expires=${dayData.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expired};path=/`;
}

function getCookie(cookieName) {
  const name = `${cookieName}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const data = decodedCookie.split(';');
  for (let i = 0; i < data.length; i += 1) {
    let cItem = data[i];
    while (cItem.charAt(0) === ' ') {
      cItem = cItem.substring(1);
    }
    if (cItem.indexOf(name) === 0) {
      return cItem.substring(name.length, cItem.length);
    }
  }
  return '';
}

function deleteCookie(cookieName) {
  const dayData = new Date();
  dayData.setTime(dayData.getTime() + (-99 * 24 * 60 * 60 * 1000));
  const expired = `expires=${dayData.toUTCString()}`;
  document.cookie = `${cookieName}=;${expired};path=/`;
}

export {
  setCookie,
  getCookie,
  deleteCookie,
};
