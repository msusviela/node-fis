# Node y npm

Node.js® es un entorno de ejecución de JavaScript multiplataforma, de código abierto y gratuito que permite a los desarrolladores crear servidores, aplicaciones web, herramientas de línea de comando y scripts. [Documentación Oficial](https://nodejs.org/es)

npm es un administrador de paquetes para el lenguaje de programación JavaScript mantenido por npm, Inc., una subsidiaria de GitHub . npm es el administrador de paquetes predeterminado para el entorno de ejecución de JavaScript Node.js y se incluye como una característica recomendada en el instalador de Node.js.

# Requisitos previos:
- Instalar Node.js siguiendo las instrucciones de la [página oficial](https://nodejs.org/es/download)

# Pasos:

- Creación del proyecto con Node:

`npm init` 

- Agregar al archivo .gitignore la carpeta donde se encuentran almacenadas las dependencias

## ESLint

- Instalar la dependencia de ESLint:

`npm install --save-dev eslint`

> La opción --save-dev en npm (o -D para abreviar) le dice a npm que agregue un paquete a la sección "devDependencies" del archivo package.json

- Configurar e inicializar ESLint en el proyecto (esto se debe hacer sólo cuando se agrega la dependencia):
`npx eslint --init`

- Ejecutar el comando para correr el linter en todo el proyecto:
`npx eslint .`
> Con este comando se realizan algunos arreglos de forma automática `npx eslint . --fix`

- Solucionar los problemas, guardar los archivos y verificar.

- Cambiar el archivo eslint.config.mjs por el siguiente, agregando nuevas reglas:
```
import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  {
    rules: {
      "no-alert": "warn",
      "no-var": "warn",
      "max-depth": ["warn", { max: 3 }],
      "max-statements": [
        "warn",
        { max: 15 },
        { ignoreTopLevelFunctions: true },
      ],
    },
  },
];

```

[Reglas ESLint](https://eslint.org/docs/latest/rules/)

# Prettier
[Prettier](https://prettier.io/) es un formateador de código de opinión para JavaScript y otros lenguajes. Se encarga de mantener un estilo consistente automáticamente, corrigiendo detalles de formato como espacios, comillas, punto y coma, indentación, etc.
Prettier es opinionated (de opinión), lo cual significa que impone un conjunto de reglas de estilo predeterminadas, sin dejar demasiado margen para personalizar cada pequeño detalle.

- Instalar la depndencia:
`npm install --save-dev prettier`

- Agregar el script al package.json para ejecutar el formatter:
`format": "prettier . --write`

- Ejecutar el formatter y ver que archivos cambia:
`npm run format`

- Modificar el archivo `eslint.config.mjs` para incluir reglas vinculadas con el formato:

```
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: { prettier: pluginPrettier },
    rules: {
      "no-alert": "warn",
      "no-var": "warn",
      "max-depth": ["warn", { max: 3 }],
      "max-statements": ["warn", { max: 15 }],
      "prettier/prettier": "warn", // Integrar la regla de Prettier
    },
  },
];
```