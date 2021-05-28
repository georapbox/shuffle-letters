import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const LIBRARY_NAME = 'shuffle-letters';
const EXTERNAL = []; // Indicate which modules should be treated as external
const GLOBALS = {}; // https://rollupjs.org/guide/en/#outputglobals

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 * @homepage ${pkg.homepage}
 * @repository ${pkg.repository.url}
 * @license ${pkg.license}
 */`;

const makeConfig = (env = 'development') => {
  let bundleSuffix = '';

  if (env === 'production') {
    bundleSuffix = 'min.';
  }

  const config = {
    input: 'src/index.js',
    external: EXTERNAL,
    output: [
      {
        banner,
        name: 'shuffleLetters',
        file: `dist/${LIBRARY_NAME}.umd.${bundleSuffix}js`, // UMD
        format: 'umd',
        exports: 'auto',
        globals: GLOBALS
      },
      {
        banner,
        file: `dist/${LIBRARY_NAME}.cjs.${bundleSuffix}js`, // CommonJS
        format: 'cjs',
        // We use `default` here as we are only exporting one thing using `export default`.
        // https://rollupjs.org/guide/en/#outputexports
        exports: 'default',
        globals: GLOBALS
      },
      {
        banner,
        file: `dist/${LIBRARY_NAME}.esm.${bundleSuffix}js`, // ESM
        format: 'es',
        exports: 'auto',
        globals: GLOBALS
      }
    ],
    plugins: [
      babel({
        babelHelpers: 'bundled',
        exclude: ['node_modules/**']
      })
    ]
  };

  if (env === 'production') {
    config.plugins.push(terser({
      output: {
        comments: /^!/
      }
    }));
  }

  return config;
};

export default commandLineArgs => {
  const configs = [
    makeConfig()
  ];

  // Production
  if (commandLineArgs.environment === 'BUILD:production') {
    configs.push(makeConfig('production'));
  }

  return configs;
};
