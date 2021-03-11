const { INSIGHTS_KEY } = process.env;

require('./prepare');

module.exports = {
	env: {
		INSIGHTS_KEY,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		});

		return config;
	},
};
