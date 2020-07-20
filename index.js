var postcss = require('postcss');

var RULE_RE = /(height|width|resolution)\s*:\s*\d+\)/g;

module.exports = postcss.plugin('postcss-default-unit', function (opts) {
  opts = opts || {};
  opts.unit = opts.unit || 'px';

  var defaultIgnore = {
    animation: true,
    'animation-iteration-count': true,
    columns: true,
    'column-count': true,
    'fill-opacity': true,
    flex: true,
    'flex-grow': true,
    'flex-shrink': true,
    'font-weight': true,
    'line-height': true,
    opacity: true,
    order: true,
    orphans: true,
    'stroke-opacity': true,
    widows: true,
    'z-index': true,
    zoom: true,
  };

  opts.ignore = opts.ignore || {};

  Object.keys(defaultIgnore).forEach(function (key) {
    if (typeof opts.ignore[key] === 'undefined') opts.ignore[key] = defaultIgnore[key];
  });

  function transformDecl(decl) {
    if (!opts.ignore[decl.prop]) {
      decl.value = postcss.list
        .space(decl.value)
        .map((str) => {
          if (str.indexOf('(') !== -1) return str;
          return str
            .split(/([,\/])/)
            .map((sub) => {
              const n = parseFloat(sub);
              if (!isNaN(n) && n !== 0 && n.toString() === sub) return n + opts.unit;
              return sub;
            })
            .join('');
        })
        .join(' ');
    }
  }

  function transformRule(rule) {
    if (rule.name === 'media') {
      rule.params = rule.params.replace(RULE_RE, function (match) {
        return match.replace(/\d+/, '$&' + opts.unit);
      });
    }
  }

  function defaultUnit(style) {
    style.walkDecls(transformDecl);
    style.walkAtRules(transformRule);
  }

  return defaultUnit;
});
