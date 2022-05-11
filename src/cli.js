#!/usr/bin/env node
/* eslint-disable no-console */

/* La anterior es una instancia de una línea shebang: los primera línea en un archivo ejecutable de texto
sin formato en Plataformas tipo Unix que le dice al sistema a qué intérprete pasar ese archivo para su
ejecución, a través de la línea de comando siguiendo la magia #! prefix (llamado el asunto). */

const md = require('./mdlinks.js');
const { validate, stats, twOptions } = require('./validate.js');
const path = process.argv[2];

let options = {
    validate: false,
    stats: false
};

/* esta Funcion nos ayudara a dar opciones al objeto options */
// const inputOpt = () => {
if (process.argv.includes('--validate') && process.argv.includes('--stats')) {
    options.validate = true;
    options.stats = true;
    twOptions(path).then(res => console.log(' Total: ', res.Total, '\n', 'Unique: ', res.Unique,  '\n', 'Broken: ', res.Broken));
} else if (process.argv.includes('--stats')) {
    options.stats = true;
    stats(path).then(res => console.log(' Total: ', res.Total, '\n', 'Unique: ', res.Unique));
} else if (process.argv.includes('--validate')) {
    options.validate = true;
    // eslint-disable-next-line no-console
    console.log('validate');
    validate(path).then(res => console.log(' Href: ',  res.map((link) => link.file+ ' ' + link.href + ' ' + link.ok + ' ' + link.status + ' '+ link.text)));
    
} else {
    md.mdLinks(path, { validate: true }).then(res => console.log(res))
        .catch(()=>{
        // eslint-disable-next-line indent
         console.log('por favor escribe una ruta');
        });
}
// }