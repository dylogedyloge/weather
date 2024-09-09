import React from "react";

interface CurrentWeatherProps {
  data: {
    location: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
  };
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg rounded-xl p-6 mb-6">
      <h3 className="text-2xl font-bold mb-4 text-blue-800">Current Weather</h3>
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="relative w-32 h-32 mb-4 md:mb-0 md:mr-6">
          <img
            src={`http://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt="Weather icon"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-grow text-center md:text-left">
          <h4 className="text-2xl font-semibold text-gray-800 mb-2">
            {data.location}
          </h4>
          <p className="text-5xl font-bold text-blue-600 mb-4">
            {data.temperature.toFixed(1)}°C
          </p>
          <p className="text-lg font-medium text-gray-700 capitalize mb-4">
            {data.description}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p className="text-sm font-medium text-gray-500">Humidity</p>
              <p className="text-xl font-semibold text-gray-800">
                {data.humidity}%
              </p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p className="text-sm font-medium text-gray-500">Wind Speed</p>
              <p className="text-xl font-semibold text-gray-800">
                {data.windSpeed.toFixed(1)} m/s
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
