const md = require('./isfile.js');
//Se importa Fetch para realizar la petición HTTP
const { default: fetch } = require("node-fetch");


const validate = (path) => {
  return md.getLinks(path).then(res => {
    const array = res.map((link) => fetch(link.href)
      .then((response) => ({
        href: link.href,
        text: link.text,
        file: link.path,
        status: response.status,
        ok: response.ok ? 'OK' : 'FAIL'
      }))
      .catch(() => ({
        href: link.href,
        text: link.text,
        file: link.path,
        status: 404,
        ok: 'FAIL'
      })));
    return Promise.all(array);
  })
}

const stats = (path) => {
  return md.getLinks(path).then(res => {
    const array = res.map((link => link.json))
    const arrayUnique = []
    res.forEach(element =>{
    if(!arrayUnique.includes(element.href)){
      arrayUnique.push(element.href)
    }
    });
      return ({
        total: array.length,
        unique: arrayUnique.length
      })
  })
  
}

module.exports = {
  validate,
  stats
}