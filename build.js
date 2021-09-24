let fs = require('fs')

build({
  entryPoints: [`builds/cdn.js`],
  outfile: `dist/index.min.js`,
  bundle: true,
  minify: true,
  sourcemap: false,
  platform: 'browser',
  define: { CDN: true }
})

build({
  entryPoints: [`builds/module.js`],
  outfile: `dist/index.esm.js`,
  bundle: true,
  minify: true,
  platform: 'neutral',
  mainFields: ['main', 'module']
})

build({
  entryPoints: [`builds/module.js`],
  outfile: `dist/index.cjs.js`,
  bundle: true,
  minify: true,
  target: ['node10.4'],
  platform: 'node',
})

async function build(options) {
  options.define || (options.define = {})
  options.define['process.env.NODE_ENV'] = process.argv.includes('--watch')
    ? `'production'`
    : `'development'`

  try {
    return require('esbuild').build({
      watch: process.argv.includes('--watch'),
      ...options
    })
  } catch (e) {
    return process.exit(1)
  }
}
