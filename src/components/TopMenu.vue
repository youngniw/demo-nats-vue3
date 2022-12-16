<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-row align="center">
        <v-col cols="auto">
            <v-img width="40px" height="40px" :src="require('@/assets/icon/ic_car_menu.png')" contain></v-img>
        </v-col>
        <v-col class="menu-title ms-2 font-weight-bold">
            {{ title }}
        </v-col>

        <v-col v-if="isMap" class="ms-2 font-weight-bold text-right">
            <span class="me-1" style="color: #777777;">위치:</span> {{ district.sido }} - {{ district.sigungu }} - {{ district.eupmyeondong }}
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
import envMap from '@/envMap.js';

import { ref } from 'vue';
import axios from 'axios';

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        isMap: {
            type: Boolean,
            default: false,
        },
        longitude: {
            type: Number,
            default: envMap.options.center.longitude
        },
        latitude: {
            type: Number,
            default: envMap.options.center.latitude
        }
    },
    setup(props) {
        let district = ref(envMap.initialDistrict);

        if (props.isMap) {
            // 좌표에 따른 구역 정보 조회
            axios({
                url: envMap.kakaoCoord2RegionUrl,
                method: 'get',
                params: {
                    x: props.longitude,
                    y: props.latitude,
                },
                headers: {
                    'Authorization': envMap.kakaoApiKey
                },
            })
            .then((response) => {
                district.value = {
                    sido: response.data.documents[0].region_1depth_name,
                    sigungu: response.data.documents[0].region_2depth_name,
                    eupmyeondong: response.data.documents[0].region_3depth_name
                }
            })
            .catch((error) => {
                console.log(error);
            });
        }

        return {
            district
        };
    }
}
</script>

<style scoped>
.v-row {
    margin: 0;
}
.v-col {
    padding: 0;
}
.menu-title {
    color: #777777;
    font-size: 16pt;
}
</style>