/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			screens: {
				phone: { max: '1300px' },
				mini: { max: '435px' },
			},
		},
	},
	plugins: [],
};

