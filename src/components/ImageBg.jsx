import { createApi } from 'unsplash-js';
import { useEffect, useState } from 'react';

const ImgBg = ({ city }) => {
	const [img, setImg] = useState();
	const unsplash = createApi({
		accessKey: process.env.UNSPLASH_SECRET_KEY,
	});

	useEffect(() => {
		unsplash.search
			.getPhotos({
				query: `${city}`,
				orderBy: 'relevant',
				page: 1,
				perPage: 2,
			})
			.then((result) => {
				if (result.type === 'success') {
					const response = result.response.results[0];
					console.log(response.urls);
					setImg(response.urls.regular);
				}
			});
	}, [city]);

	return (
		<div className="absolute top-0 bottom-0">
			<img className="object-cover w-full h-full" src={img} />
			{/* Overlay */}
			<div className="z-10 absolute top-0 left-0 h-full w-full bg-gray-950 opacity-55"></div>
		</div>
	);
};

export default ImgBg;
