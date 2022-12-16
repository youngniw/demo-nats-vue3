import store from '@/store/index.js';

// 차 마커 추가
export const addMarker = (map, information) => {
    /* global kakao */

    const markerImg = new kakao.maps.MarkerImage('/ic_map_marker.png', new kakao.maps.Size(35, 35));
    const selectedMarkerImg = new kakao.maps.MarkerImage('/ic_map_marker_selected.png', new kakao.maps.Size(35, 35));

    const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(information.latitude, information.longitude),
        title: information.serialNumber,
        image: markerImg,
        zIndex: 5,
    });
    marker.setClickable(true);

    // 마우스 오버, 마우스 아웃 이벤트
    kakao.maps.event.addListener(marker, 'mouseover', () => {
        // 차량 번호 표시
        store.commit('UPDATE_CAR_INFO_WINDOW', marker);
    });
    kakao.maps.event.addListener(marker, 'mouseout', () => {
        // 차량 번호 표시 취소
        store.commit('CLOSE_CAR_INFO_WINDOW');
    });

    kakao.maps.event.addListener(marker, 'click', () => {
        // 차량 최신 상태 정보 표시
        if (store.getters['GET_SELECTED_MARKER'] !== marker) {
            store.commit('SET_SELECTED_MARKER', marker);

            store.commit('CLOSE_CAR_INFO_WINDOW');
            map.setCenter(marker.getPosition());        // 화면의 중앙으로 오게 함
            marker.setImage(selectedMarkerImg);
        }
    });
    store.commit('ADD_CAR_MARKER', marker);
};

// 차 마커 추가
export const changeMarkerData = (marker, information) => {
    /* global kakao */
    
    marker.setPosition(new kakao.maps.LatLng(information.latitude, information.longitude));
};

// 차 마커 이미지 기본으로 변경
export const resetMarkerImage = (marker) => {
    /* global kakao */
    const markerImg = new kakao.maps.MarkerImage('/ic_map_marker.png', new kakao.maps.Size(35, 35));
    marker.setImage(markerImg);
};

// 차 마커 선택
export const selectingMarker = (marker) => {
    /* global kakao */
    const selectedMarkerImg = new kakao.maps.MarkerImage('/ic_map_marker_selected.png', new kakao.maps.Size(35, 35));
    
    if (store.getters['GET_SELECTED_MARKER'] !== marker) {
        store.commit('SET_SELECTED_MARKER', marker);

        store.getters['GET_MAP'].setCenter(marker.getPosition());        // 화면의 중앙으로 오게 함
        marker.setImage(selectedMarkerImg);
    }
};

// 차 클릭 시 차량 설명 보여줌
export const showCarInfoOverlay = (marker, payload) => {
    /* global kakao */

    const markerPosition = marker.getPosition();
    
    // TODO: 위치를 level에 맞게 조정해야 함!

    store.commit('UPDATE_CLICKED_CAR_OVERLAY', {
        gear: payload.gear,
        serialNumber: marker.getTitle(),
        state: payload.state,               // 상태 ('대기' or '운행')
        stateTime: payload.stateTime,       // 상태 유지 시간
        position: new kakao.maps.LatLng(markerPosition.getLat()+0.002, markerPosition.getLng())
    });
}
