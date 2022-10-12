window.$docsify = {
  name: 'Inner Core Docs',
  repo: 'mineprogramming/innercore-docs',
  loadSidebar: 'config/_sidebar.md',
  loadNavbar: 'config/_navbar.md',
  subMaxLevel: 4,
  relativePath: true,
  autoHeader: true,
  nameLink: {
    '/ru/': '#/ru/',
    '/en/': '#/en/',
    '/': '#/'
  },
  alias: {
    '/ru/(.*/|)config/(.*)': '/ru/config/$2',
    '/(en/|)(.*/|)config/(.*)': '/en/config/$3',
    '/.*/src/(.*)': '/src/$1'
  },
  themeable: {
    readyTransition: true, // default
    responsiveTables: true // default
  },
  // https://github.com/jperasmus/docsify-copy-code
  copyCode: {
    buttonText: {
      '/zh-cn/': '点击复制',
      '/ru/': 'Скопировать в буфер обмена',
      '/de-de/': 'Klicken Sie zum Kopieren',
      '/es/': 'Haga clic para copiar',
      '/': 'Copy to clipboard'
    },
    errorText: {
      '/zh-cn/': '错误',
      '/ru/': 'Ошибка',
      '/': 'Error'
    },
    successText: {
      '/zh-cn/': '复制',
      '/ru/': 'Скопировано',
      '/de-de/': 'Kopiert',
      '/es/': 'Copiado',
      '/': 'Copied'
    }
  },
  // https://jhildenbiddle.github.io/docsify-tabs
  tabs: {
    persist: true, // default
    sync: true, // default
    theme: 'classic', // default
    tabComments: true, // default
    tabHeadings: true // default
  },
  timeUpdater: {
    text: '> Last Modify: {docsify-updated}',
    formatUpdated: '{DD}.{MM}.{YYYY}'
  },
  plugins: [
    function (hook, vm) {
      hook.beforeEach(function (html) {
        if (/githubusercontent\.com/.test(vm.route.file)) {
          url = vm.route.file
            .replace('raw.githubusercontent.com', 'github.com')
            .replace(/\/gh-pages/, '/blob/gh-pages');
        } else if (/jsdelivr\.net/.test(vm.route.file)) {
          url = vm.route.file.replace('cdn.jsdelivr.net/gh', 'github.com').replace('@gh-pages', '/blob/gh-pages');
        } else {
          url = 'https://github.com/mineprogramming/innercore-docs/blob/gh-pages/' + vm.route.file;
        }
        return html + '\n\n[:memo: Edit Document](' + url + ')';
      });
    }
  ]
};
