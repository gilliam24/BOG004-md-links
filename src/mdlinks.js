const fs = require('fs');
const md = require('./isfile.js');
const { validate, stats } = require('./validate.js')
const cli = require('./cli.js')



const mdLinks = (path, options) => {
    /* console.log('options', options); */
    const promise = new Promise((resolve, reject) => {
        /* console.log('path', path); */
        const absoluteRoute = md.readRoute(path);
        if (fs.existsSync(absoluteRoute) === false) {
            reject(new Error('La ruta ingresada es invalida'));
        } else {
            if (options.validate === true) {
                validate(absoluteRoute).then(res => console.log('validate', res));
            } else {
                if (options.stats === true) {
                    stats(absoluteRoute).then(res => console.log('stats', res))
                }else{
                    md.getLinks(absoluteRoute).then(res => console.log('links', res))
                }
            }
        }
        resolve()
    });
    return promise
}



module.exports = {
    mdLinks,

}