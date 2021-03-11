const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const { SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NODE_ENV } = process.env;
const { INSIGHTS_KEY } = process.env;

require('./prepare');

module.exports = {
	env: {
		INSIGHTS_KEY,
		RELEASE: process.env.COMMIT_REF,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		});
		if (NODE_ENV === 'production' && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
			config.plugins.push(new SentryWebpackPlugin({
				include: '.next',
				ignore: ['node_modules'],
				urlPrefix: "~/_next",
				stripPrefix: ['webpack://_N_E/'],
				ext: ['js', 'ts', 'map', 'jsbundle'],
				release: process.env.COMMIT_REF,
			}));
		}

		return config;
	},
};
