//Ici on va faire la fonction qui permet à ES BUILD de packager le code src pour qu'il soit exporté dans GAS.
//NPM appelle ESBUILD, ESBUILD cherche son fichier de config, (esbuild.config.js).
//ce fichier pointe vers le code source src.
//Il le ".rar" en un fichier "compressé"
//ce fichier (qui est toujours un .js cependant), sera mis dans le dossier de destination "dist/main.js"
//une fois le fichier dans dist, il faut le pusher vers GAS, et c'est là que clasp intervient, c'est l'interface avec google. 
//On l'a mis nous en global, parce que .
//En fati le fait de builder en dist/main.js, ce n'est pas nécessaire dans le cas d'un push vers GAS, on peut tout simplement pousher src et ça fonctionne

const esbuild = require('esbuild');


esbuild.build({
  entryPoints: ['src/main.js'],
  bundle: true,
  outfile: 'dist/main.js',
  platform: 'neutral',
  target: 'es5',
  format: 'esm',       // ← ESM au lieu d'IIFE
  minify: false,
  legalComments: 'none'
}).catch(() => process.exit(1));