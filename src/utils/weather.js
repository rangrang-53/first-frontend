export const getWeatherByLocation = async (latitude, longitude, apiKey) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=kr&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("날씨 정보를 가져오는 데 실패했습니다.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || "날씨 정보를 가져오는 데 실패했습니다.");
  }
};
