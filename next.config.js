const { getRedirectStatus } = require('next/dist/lib/load-custom-routes');

require('./prepare');

module.exports = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		});

		return config;
	},
	redirects: async () => [
		{
			source: '/about',
			destination: '/#about',
			permanent: true,
		}
	]
}
