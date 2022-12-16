<template>
  <v-container class="search-car ma-0 pa-1 d-flex flex-column flex-wrap" fluid>
        <v-row class="row-title flex-grow-0">
            <TopMenu title="내 차 찾기" :isMap="true"></TopMenu>
        </v-row>

        <v-row class="flex-grow-0 mt-1 mb-3" justify="end">
            <v-col cols="auto">
                <SearchBar @loadCarInfo="searchCarByNumber"></SearchBar>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-container class="ma-0 pa-0 d-flex flex-column" fluid>
                <MainMap class="flex-grow-1"></MainMap>
            </v-container>
        </v-row>
    </v-container>
</template>

<script>
import env from '@/env.js';
import TopMenu from '@/components/TopMenu.vue';
import MainMap from '@/components/MainMap.vue';
import SearchBar from '@/components/SearchBar.vue';

import { onMounted } from 'vue';
import { useStore } from 'vuex';
import { connect, StringCodec } from 'nats.ws';
import { selectingMarker } from '@/utils/map.js';

export default {
    components: {
        TopMenu,
        MainMap,
        SearchBar
    },
    setup() {
        const store = useStore();

        const searchCarByNumber = (serialNumber) => {
            if (serialNumber) {
                // 차량 검색
                const marker = store.getters['GET_MARKERS'].get(serialNumber);
                if (marker) {
                    selectingMarker(marker);
                }
                else {
                    alert('존재하지 않은 차량 번호입니다.');
                }
            }
            else {
                // 모든 차량 마커 표시
                store.commit('SET_SELECTED_MARKER', undefined);
            }
        };

        onMounted(async function () {
            // NATS 관련 설정
            const connection = await connect({
                servers: env.natsURL,
                user: env.natsConnectionAccount.user,
                pass: env.natsConnectionAccount.password,
            });
            store.commit('SET_NATS_CONNECTION', connection);

            const sc = StringCodec();

            const subscription = connection.subscribe('msg.car.data');
            for await (const msg of subscription) {
                store.dispatch('SAVE_CAR', JSON.parse(sc.decode(msg.data)));
            }
        });

        return {
            searchCarByNumber,
        }
    }
}
</script>

<style scoped>
.search-car {
    height: 100%;
}
.v-row {
    margin: 0;
}
.v-col {
    padding: 0;
}
</style>
