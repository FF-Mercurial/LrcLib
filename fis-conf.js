var meta = require('./package.json')
fis.config.set('name', meta.name)
fis.config.set('version', meta.version)
fis.config.set('project.exclude', 'node_modules/**')
fis.config.set('framework', {
  cache: process.env.CACHE,
  urlPattern: '/c/%s',
  comboPattern: '/co??%s',
});

var babel = require('babel-core')

fis.config.set('modules.parser.js', function (content, file) {
  var id = file.getId();
  if (/^views\/lib\//.test(id)) return content
  if (/^views\/lib.js/.test(id)) return content
  else return babel.transform(content).code
})

fis.config.data.roadmap.path.splice(0, 0, {
  reg: /^\/server\/(.*)$/,
  useParser: true,
  useStandard: false,
  useHash: false,
})

fis.config.data.roadmap.path.splice(0, 0, {
  reg: /^\/bin\/(.*)$/,
  release: false,
})