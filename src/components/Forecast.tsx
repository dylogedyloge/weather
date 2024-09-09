import React from "react";

interface ForecastProps {
  data: {
    date: string;
    temperature: number;
    description: string;
    icon: string;
  }[];
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-50 shadow-lg rounded-xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-blue-800">5-Day Forecast</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {data.map((day, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center"
          >
            <p className="font-semibold text-lg text-blue-700 mb-2">
              {day.date}
            </p>
            <div className="relative w-20 h-20 mb-2">
              <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="Weather icon"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">
              {day.temperature.toFixed(1)}°C
            </p>
            <p className="text-sm font-medium text-gray-600 capitalize">
              {day.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
