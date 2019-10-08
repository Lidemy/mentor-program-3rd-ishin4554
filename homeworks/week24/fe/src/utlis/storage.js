const storage = {
  addCookie : (id) => {
    const time = new Date();
    time.setTime(time.getTime() + 60 * 1000);
    document.cookie = `token=${id};expires=${time};`;
  },
  removeCookie : () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  getCookie : (key) => {
    const regex = new RegExp(
      "(?:(?:^|.*;\\s*)" + key + "\\s*\\=\\s*([^;]*).*$)|^.*$"
    );
    return document.cookie.replace(regex, "$1");
  }

}

export default storage;

