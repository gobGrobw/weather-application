import { TbUvIndex } from 'react-icons/tb';
import { WiHumidity } from 'react-icons/wi';
import { PiCompassRoseLight } from 'react-icons/pi';
import { FaMagnifyingGlass, FaWind, FaCloudSun } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import ImgBg from './components/ImageBg';

const App = () => {
	// Url to fetch weather data just need to add the city name at the end of the url
	const [weatherData, setWeatherData] = useState({});
	const [degree, setDegree] = useState('c');
	const [searchCity, setSearchCity] = useState('Jakarta');
	const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=`;

	const fetchWeatherData = async (city) => {
		try {
			const response = await fetch(weatherUrl + city, { mode: 'cors' });
			const data = await response.json();
			setWeatherData({
				name: data.location.name,
				region: data.location.region,
				country: data.location.country,
				temp_c: data.current.temp_c,
				temp_f: data.current.temp_f,
				condition: data.current.condition.text,
				condition_logo: data.current.condition.icon,
				feelsLike_c: data.current.feelslike_c,
				feelsLike_f: data.current.feelslike_f,
				wind_mph: data.current.wind_mph,
				wind_direction: data.current.wind_dir,
				humidity: data.current.humidity,
				cloud: data.current.cloud,
				uv: data.current.uv,
			});
		} catch (err) {
			return alert('Location does not exist!');
		}
	};

	useEffect(() => {
		fetchWeatherData(searchCity);
	}, [searchCity]);

	useEffect(() => {
		console.log(weatherData);
	}, [weatherData]);

	return (
		<>
			<main className="h-[60dvh] w-[55dvw] phone:h-full phone:w-full relative flex justify-between items-center overflow-hidden phone:rounded-none rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] bg-white">
				<ImgBg city={`${weatherData.name} city, ${weatherData.country}`} />
				<div className="w-full h-full flex text-white flex-col justify-around z-10">
					<Searchbar
						cbFn={(e) => {
							e.preventDefault();
							setSearchCity(e.target.elements.input.value);
						}}
					/>
					<div className="w-full flex justify-between items-center shrink-0 pl-20 pr-12 pb-10 phone:flex-col phone:gap-10">
						<section className="phone:text-center">
							<h1 className="text-6xl mb-3 font-semibold">
								{weatherData.name || '---'}
							</h1>
							<p className="text-xl">
								Region: {weatherData.region || '---'}
							</p>
							<p className="text-xl">{weatherData.country || '---'}</p>
						</section>

						<section className="flex w-72 flex-col justify-center items-center overflow-hidden">
							<div>
								{degree === 'c' ? (
									<h1 className="text-6xl font-semibold tracking-wider transition text-center">
										{weatherData.temp_c || '---'}&deg;C
									</h1>
								) : (
									<h1 className="text-6xl font-semibold tracking-wider transition text-center">
										{weatherData.temp_f || '---'}&deg;F
									</h1>
								)}
								<div>
									<div>
										<div className="flex justify-center items-center">
											<div className="size-14 flex justify-center items-center overflow-hidden">
												<img
													className="size-14 object-cover"
													src={
														weatherData.condition_logo ||
														'---'
													}
													alt={
														weatherData.condition ||
														'---'
													}
												/>
											</div>
											<p className="text-2xl">
												{weatherData.condition || '---'}
											</p>
										</div>
									</div>

									{/* Button to switch between celcius and fahrenheit */}
									<div className="flex justify-center gap-5 font-semibold text-2xl">
										<button
											className={`py-1 px-2 transition rounded-lg ${
												degree == 'c' &&
												'backdrop-brightness-75 backdrop-blur-sm'
											}`}
											onClick={() => setDegree('c')}
										>
											&deg;C
										</button>
										<button
											className={`py-1 px-2 transition rounded-lg ${
												degree == 'f' &&
												'backdrop-brightness-75 backdrop-blur-sm'
											}`}
											onClick={() => setDegree('f')}
										>
											&deg;F
										</button>
									</div>
								</div>
							</div>
						</section>
					</div>

					<section className="w-full flex flex-wrap justify-center shrink-0 gap-5">
						<InfoBox>
							<h1 className="mb-2">Wind speed</h1>
							<h1 className="flex justify-center items-center">
								<FaWind size={20} />
								&nbsp;
								{weatherData.wind_mph || '---'}
								<span className="font-light opacity-75">mph</span>
							</h1>
						</InfoBox>
						<InfoBox>
							<h1 className="mb-2">Wind direction</h1>
							<h1 className="flex justify-center items-center">
								<PiCompassRoseLight size={25} />
								&nbsp;
								{weatherData.wind_direction || '---'}
							</h1>
						</InfoBox>
						<InfoBox>
							<h1 className="mb-2">Cloud cover</h1>
							<h1 className="flex justify-center items-center">
								<FaCloudSun size={25} />
								&nbsp;
								{weatherData.cloud || '---'}
								<span className="font-light opacity-75">%</span>
							</h1>
						</InfoBox>
						<InfoBox>
							<h1 className="mb-2">Humidity</h1>
							<h1 className="flex justify-center items-center">
								<WiHumidity size={25} />
								&nbsp;
								{weatherData.humidity || '---'}
								<span className="font-light opacity-75">%</span>
							</h1>
						</InfoBox>
						<InfoBox>
							<h1 className="mb-2">UV Index</h1>
							<h1 className="flex justify-center items-center">
								<TbUvIndex size={25} />
								&nbsp;
								{weatherData.uv || '---'}
							</h1>
						</InfoBox>
					</section>
				</div>
			</main>
		</>
	);
};

const InfoBox = ({ children }) => {
	return (
		<div className="border-4 text-center rounded-lg w-[200px] text-2xl font-semibold border-gray-950 border-opacity-25 p-3 backdrop-blur-sm mini:text-base mini:w-[150px]">
			{children}
		</div>
	);
};

const Searchbar = ({ cbFn }) => {
	return (
		<form onSubmit={cbFn} className="z-20 flex justify-center items-center">
			<input
				type="text"
				placeholder="Enter city..."
				id="input"
				className="text-white bg-transparent font-semibold border-white border-b-[4px] text-lg p-2 border-opacity-25"
			/>
			<button type="submit" className="pl-1 text-white">
				<FaMagnifyingGlass size={20} />
			</button>
		</form>
	);
};

export default App;

