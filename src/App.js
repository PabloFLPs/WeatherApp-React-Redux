import { useEffect, useState } from "react"

// Redux:
import { useDispatch, useSelector } from "react-redux"
import { fetchWeatherAction } from "./redux/slices/weather"

function App() {
  const [city, setCity] = useState("")

  // Dispatch Action:
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchWeatherAction("birmingham"))
  }, [])

  // Select state from store:
  const state = useSelector((state) => state)
  const { weather, loading, error } = state.reducer

  return (
    <div className="bg-gray-900">
      <section className="relative bg-gray-900 min-h-screen">
        <div className="relative container pt-6 px-4 mx-auto text-center">
          <h2 className="mt-4 mb-4 lg:mb-12 text-white text-4xl lg:text-6xl font-semibold">
            Weather <span className="text-green-600">App</span>
          </h2>
          <p className="max-w-3xl mx-auto mb-4 lg:mb-10 text-white text-xl">
            Find out the current weather in each city in the world!
          </p>
          <div className="sm:inline-flex sm:gap-4">
            {/* Input */}
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Search City"
              className="relative inline-block w-full md:w-auto px-3 py-3 font-medium leading-normal bg-transparent border-2 rounded-lg text-green-400"
            ></input>
            {/* Button */}
            <button
              onClick={() => dispatch(fetchWeatherAction(city))}
              type="button"
              className="inline-flex items-center px-6 text-center py-4 border border-transparent text-sm mt-4 sm:mt-0 leading-4 font-medium rounded-md shadow-sm text-gray-900 bg-green-600 hover:opacity-50 transition-all duration-300 focus:outline-none"
            >
              Search
            </button>
          </div>
        </div>
        {/* Content goes here */}
        {loading ? (<h1 className="text-gray-400 text-4xl text-center py-32">Loading, please wait...</h1>) : error ? (<h1 className="text-red-400 text-2xl text-center py-32">{error?.message.toUpperCase()}</h1>) : (
          <div className="max-w-6xl px-4 mx-auto py-10">
            <div className="flex flex-wrap -mx-4 justify-center">
              <div className="w-full md:w-1/3 px-4">
                <div className="p-8 border border-green-600 rounded-lg">
                  <div className="flex justify-start  items-center">
                    <span className="flex items-center justify-center w-16 h-16 rounded-full border-2">
                      {/* weather logo */}
                      <img
                        className="w-56"
                        src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                        alt="/"
                      />
                    </span>
                    <h1 className="text-gray-300 pl-5">
                      {weather?.weather[0].main}
                    </h1>{" "}
                  </div>
                  <h1 className="text-gray-300 text-center text-4xl mb-10">
                    {Math.ceil(Number(weather?.main.temp))}{" "}
                    <span className="text-yellow-500 text-4xl">°C</span>
                  </h1>
                  <h3 className="mb-6 text-xl text-white font-semibold">
                    {weather?.name}, {weather?.sys?.country}
                  </h3>
                  <p className="mb-8 text-gray-300 text-justify">
                    The weather condition in {weather?.name},{" "}
                    {weather?.sys?.country} is described as:{" "}
                    <span className="font-semibold">
                      {weather?.weather[0].description} with a temperature of{" "}
                      {Math.ceil(Number(weather?.main.temp))} °C and a humidity of{" "}
                      {weather?.main?.humidity}%.
                    </span>
                  </p>
                  <span className="flex ml-auto  items-center justify-center w-16 h-16 rounded-full border-2">
                    {/* weather logo */}
                    <img
                      className="w-56"
                      src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
                      alt="/"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {(!loading && !error?.message) &&
          <div className="text-center">
            <span className="text-white font-semibold">
              Built with React and Redux
            </span>
          </div>
        }
      </section>
      {/* Footer */}
      <div className="text-center bg-gray-900 py-6">
        <p className="text-white">
          &copy; {new Date().getFullYear()} Weather App - Developed by{" "}
          <span className="font-semibold">
            <a className="hover:text-green-600 transition-all duration-300" href="https://github.com/PabloFLPs" target="_blank">
              Pablo FELPs
            </a>
          </span>
        </p>
      </div>
    </div>
  )
}

export default App
