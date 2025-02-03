async function getWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const { nx, ny } = latLonToGrid(lat, lon);

        const apiKey =
          "QL99OvgowvipV6jjgv1NoKwE8GMJnbROjRN0%2BxGQJz0497ViPFxnd04lXqgSskbJMcFoGhZGQeidvVCJYOY9Jg%3D%3D"; // 발급받은 서비스 키 입력
        const date = new Date();
        const baseDate = date.toISOString().split("T")[0].replace(/-/g, ""); // YYYYMMDD 형식
        const baseTime = `${String(date.getHours()).padStart(2, "0")}00`; // HH00 형식 (정각)

        const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${apiKey}&numOfRows=10&pageNo=1&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
          if (data.response.body.items.item) {
            const weather = data.response.body.items.item.find(
              (i) => i.category === "T1H"
            );
            alert(`현재 온도: ${weather.obsrValue}°C`);
          } else {
            alert("날씨 정보를 가져오지 못했습니다.");
          }
        } catch (error) {
          console.error("날씨 데이터를 가져오는 중 오류 발생:", error);
        }
      },
      (error) => {
        console.error("위치 정보를 가져올 수 없습니다.", error);
      }
    );
  } else {
    alert("브라우저가 위치 정보를 지원하지 않습니다.");
  }
}

document.getElementById("weatherBtn").addEventListener("click", getWeather);
