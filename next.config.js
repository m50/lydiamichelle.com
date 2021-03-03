module.exports = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		});

		config.module.rules.push({
			test: /\.(jpe?g|png|webp)$/i,
			loaders: [
				'file-loader',
				'webp-loader',
			],
		});

		return config;
	}
}
