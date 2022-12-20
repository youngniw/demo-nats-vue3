import { createStore } from 'vuex';
import { addMarker, changeMarkerData } from '@/utils/map';

export default createStore({
    state: {
        natsConnection: undefined,      // nats 연결 커넥션
        map: undefined,                 // 지도
        carInfoWindow: undefined,       // 치량 마커 마우스오버시의 설명이 보여질 윈도우
        clickedCarOverlay: undefined,   // 차량 마커 클릭 시의 최신 운행 상태 정보가 보여질 오버레이
        cars: new Map([]),              // 차량 목록 (key: 차량 번호)
        markers: new Map([]),           // 마커 목록 (key: 차량 번호)
        selectedMarker: undefined,      // 선택된 차량 마커
    },
    getters: {
        GET_NATS_CONNECTION(state) {
            return state.natsConnection;
        },
        GET_MAP(state) {
            return state.map;
        },
        GET_CAR_INFO_WINDOW(state) {
            return state.carInfoWindow;
        },
        GET_CLICKED_CAR_OVERLAY(state) {
            return state.clickedCarOverlay;
        },
        GET_MARKERS(state) {
            return state.markers;
        },
        GET_SELECTED_MARKER(state) {
            return state.selectedMarker;
        },
    },
    mutations: {
        SET_NATS_CONNECTION(state, payload) {
            state.natsConnection = payload;
        },
        SET_MAP(state, map) {
            state.map = map;
        },
        SET_CAR_INFO_WINDOW(state, payload) {
            state.carInfoWindow = payload;
        },
        UPDATE_CAR_INFO_WINDOW(state, marker) {
            const content = `<div id="car-window-content" class="pa-2 text-center" style="font-size: 12pt;">차량 번호: <span class="font-weight-bold">${marker.getTitle()}</span></div>`;
            state.carInfoWindow.setPosition(marker.getPosition());
            state.carInfoWindow.setContent(content);
            state.carInfoWindow.open(state.map, marker);
        },
        CLOSE_CAR_INFO_WINDOW(state) {
            state.carInfoWindow.close();
        },
        SET_CLICKED_CAR_OVERLAY(state, payload) {
            state.clickedCarOverlay = payload;
        },
        UPDATE_CLICKED_CAR_OVERLAY(state, payload) {
            const content = 
            '<div class="overlay">'+
                '<div class="pa-2 '+(payload.gear === 1 ? 'bg-grey text-white' : 'bg-blue text-black' )+' d-flex" style="align-items: center; justify-content: space-between;">'+
                    '<div></div>'+
                    `<div class="mt-2 text-center font-weight-bold">${payload.serialNumber}</div>`+
                    `<div id="overlay-close" class="overlay-close"></div>`+
                '</div>'+
                '<div class="mt-2 pa-2 py-3">'+
                    '<div class="d-flex" style="font-size: 11pt; width: 100%; align-items: center; justify-content: space-between;">'+
                        '<div>차량 상태</div>'+
                        `<div class="font-weight-bold">${payload.state}중</div>`+
                    '</div>'+
                    '<div class="mt-4 d-flex" style="font-size: 11pt; width: 100%; align-items: center; justify-content: space-between;">'+
                        `<div>${payload.state} 시간</div>`+
                        `<div class="font-weight-bold">${payload.stateTime}</div>`+
                    '</div>'+
                '</div>'+
            '</div>';

            state.clickedCarOverlay.setPosition(payload.position);
            state.clickedCarOverlay.setContent(content);
            state.clickedCarOverlay.setMap(state.map);

            const closeOverlayImg = document.getElementById('overlay-close');
            closeOverlayImg.onclick = () => {
                // 오버레이 창 닫힘 + 선택된 차량 마커 해제
                state.clickedCarOverlay.setMap(null);
                state.selectedMarker = undefined;
            };
        },
        CLOSE_CLICKED_CAR_OVERLAY(state) {
            state.clickedCarOverlay.setMap(null);
        },
        SET_SELECTED_MARKER(state, marker) {
            state.selectedMarker = marker;
        },
        ADD_CAR_MARKER(state, marker) {
            state.markers.set(parseInt(marker.getTitle()), marker);
        },
        UPDATE_CAR(state, payload) {
            state.cars.set(payload.serialNumber, payload);
        },
    },
    actions: {
        // 하나의 차량 정보 저장 및 수정
        SAVE_CAR(context, payload) {
            const marker = context.state.markers.get(payload.serialNumber);
            if (marker) {
                // 수정
                changeMarkerData(marker, { longitude: payload.longitude, latitude: payload.latitude});
            }
            else {
                // 추가
                addMarker(context.state.map, { serialNumber: payload.serialNumber, longitude: payload.longitude, latitude: payload.latitude});
            }

            context.commit('UPDATE_CAR', payload);
        },
    },
});
