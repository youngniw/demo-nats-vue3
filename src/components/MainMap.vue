<template>
    <div id="map"></div>
</template>

<script>
import envMap from '@/envMap.js';
import { resetMarkerImage, showCarInfoOverlay } from '@/utils/map.js';

import { computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { StringCodec } from 'nats.ws';

// nats 통신 request 시 데이터를 담기 위함
const toUint8Array = (msg) => {
    const buf = new ArrayBuffer(msg.length);

    let bufView = new Uint8Array(buf);
    
    for (let i = 0; i < msg.length; i++) {
        bufView[i] = msg.charCodeAt(i);
    }
    return bufView;
}

export default {
    setup() {
        let mapContainer;

        const store = useStore();
        const selectedMarker = computed(() => store.getters['GET_SELECTED_MARKER']);

        watch(selectedMarker, (val, oldVal) => {
            // infowindow 닫기
            store.commit('CLOSE_CAR_INFO_WINDOW');

            // 이전 마커 이미지 변경
            if (oldVal)
                resetMarkerImage(oldVal);

            // 차량 마커가 존재할 시에는 오버레이 보여짐
            if (val) {
                getVehicleRecencyData(val);
            }
        });

        onMounted(() => {
            mapContainer = document.getElementById('map');

            if (window.kakao && window.kakao.maps) {
                initMap();
            }
            else {
                const script = document.createElement('script');
                script.type = 'text/javascript'
                /* global kakao */
                script.onload = () => kakao.maps.load(initMap);
                script.src = envMap.kakaoMapUrl;
                document.head.appendChild(script);
            }
        });

        // 초기 지도 설정
        const initMap = () => {
            const mapOptions = {
                center: new kakao.maps.LatLng(envMap.options.center.latitude, envMap.options.center.longitude),
                level: 4
            };

            const map = new kakao.maps.Map(mapContainer, mapOptions);
            store.commit('SET_MAP', map);

            // 인포윈도우 - 마우스 오버 시 차량 번호 표시
            const infowindow = new kakao.maps.InfoWindow({
                removable: false,
                zIndex: 8,
            });
            store.commit('SET_CAR_INFO_WINDOW', infowindow);

            // 오버레이 - 마우스 클릭 시 차량 최신 운행 상태 정보 표시
            const overlay = new kakao.maps.CustomOverlay({
                map: map,
                clickable: true,
                zIndex: 10,
            });
            store.commit('SET_CLICKED_CAR_OVERLAY', overlay);

            // TODO: 처음 페이지 띄울 때 차량 정보들을 서버로부터 받아와 띄움
        };

        const getVehicleRecencyData = async (marker) => {
            await store.getters['GET_NATS_CONNECTION'].request(`msg.car.request.${marker.getTitle()}`, toUint8Array('info'), { timeout: 4000 })
                .then((msg) => {
                    const sc = StringCodec();
                    const res = JSON.parse(sc.decode(msg.data));

                    if (Object.keys(res).length !== 0) {  // 이전 운행 정보가 있어 상태가 있는 경우
                        showCarInfoOverlay(marker, res);
                    }
                })
                .catch((err) => {
                    console.log(`Problem with NATS Request: ${err.message}`);
                });
        }
    }
}
</script>

<style>
#map {
    width: 100%;
    height: 100%;
}
.overlay {
  width: 235px; 
  border-radius: 5px;
  background: #ffffff;
  filter: drop-shadow(5px 2px 5px #000000BD);
  border: 0.1px solid #AAA;
  z-index: 10;
}
.overlay-close {
    width: 15px;
    height: 15px;
    background: url(https://cdn-icons-png.flaticon.com/512/2961/2961937.png);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}
.overlay-close:hover {
    cursor: pointer;
}
</style>
