module.exports = {
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  home: true,
  heroImage: '/ttt.png',
  heroText: null,
  title: "一个简单的生活",
  description: 'Talk is cheap,show me the code.',
  dest: 'public',
  head: [
    ['link', {
      rel: 'icon',
      href: '/favicon.ico'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [{
        text: 'Home',
        link: '/',
        icon: 'reco-home'
      },
      {
        text: 'TimeLine',
        link: '/timeline/',
        icon: 'reco-date'
      },
      {
        text: 'Docs',
        icon: 'reco-message',
        items: [{
          text: 'git推送',
          link: '/docs/git/git.md'
        }]
      },
      {
        text: 'Contact',
        icon: 'reco-message',
        items: [{
          text: 'GitHub',
          link: 'https://github.com/xing-tianlun',
          icon: 'reco-github'
        }]
      }
    ],
    sidebar: {
      '/docs/git/': [
        'git',
        // 'theme',
        // 'plugin',
        // 'api'
      ]
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    friendLink: [{
        title: '人生',
        desc: '路曼曼',
        email: '',
        link: ''
      },
      // {
      //   title: '午后南杂',
      //   desc: 'Enjoy when you can, and endure when you must.',
      //   email: '1156743527@qq.com',
      //   link: 'https://www.recoluan.com'
      // },
      // {
      //   title: 'vuepress-theme-reco',
      //   desc: 'A simple and beautiful vuepress Blog & Doc theme.',
      //   avatar: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
      //   link: 'https://vuepress-theme-reco.recoluan.com'
      // },
    ],
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: '行天伦(xing-tianlun)',
    // 作者头像
    authorAvatar: '/bingbing.png',
    // 备案号
    record: 'xing',
    // 项目开始时间
    startYear: '2022'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  }
}
