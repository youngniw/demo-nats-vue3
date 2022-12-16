const options = {
    center: {
        longitude: 127.13021796,
        latitude: 37.4119826904,
    },
    level: 5
};

// 초기 지도의 중앙 좌표 지역
const initialDistrict = {
    sido: '경기도',
    sigungu: '성남시 분당구',
    eupmyeondong: '야탑동',
};

const kakaoJavascriptKey = '751037ef7f728be2c533bb99fb97ba8d';
const kakaoApiKey = 'KakaoAK 6bf17d05765ad2d5e1d3fd2e70fda1c1';
const kakaoMapUrl = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoJavascriptKey}&libraries=services`;
const kakaoCoord2RegionUrl = 'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json';

export default {
    options,
    initialDistrict,
    kakaoJavascriptKey,
    kakaoApiKey,
    kakaoMapUrl,
    kakaoCoord2RegionUrl
}
  