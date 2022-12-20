<template>
  <v-container class="car-list ma-0 pa-1 d-flex flex-column flex-wrap" fluid>
        <v-row class="flex-grow-0">
            <TopMenu title="차량 운행 정보"></TopMenu>
        </v-row>

        <v-row class="flex-grow-0 mx-2" align="center" justify="end">
            <v-col class="mx-1" cols="auto" style="width: 150px;">
                <v-text-field
                    v-model="startDate"
                    density="comfortable"
                    hide-details="true"
                    label="시작 날짜"
                    type="date"
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col class="mx-2" cols="auto">
                ~
            </v-col>
            <v-col class="mx-1" cols="auto" style="width: 150px;">
                <v-text-field
                    v-model="endDate"
                    density="comfortable"
                    hide-details="true"
                    label="종료 날짜"
                    type="date"
                    variant="outlined"
                ></v-text-field>
            </v-col>

            <v-col class="mx-5" cols="1">
                <v-btn class="font-weight-bold px-2" color="rgba(78, 203, 113)" theme="dark" @click="fetchOperationHistoryList()">조회</v-btn>
            </v-col>

            <v-col cols="auto">
                <SearchBar @loadCarInfo="searchBySerialNumber"></SearchBar>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1 mx-2" align="center" justify="center">
            <v-col cols="10">
                <v-table class="operation-history-table my-5 pa-1" fixed-header height="550px">
                    <thead>
                        <tr>
                            <th class="text-center">운행 이력 ID</th>
                            <th class="text-center">차량 번호</th>
                            <th>운행 시간 </th>
                            <th>위도</th>
                            <th>경도</th>
                            <th class="text-center">기어</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="history in operationHistories" :key="history.logId">
                            <td class="text-center">{{ history.logId }}</td>
                            <td class="text-center font-weight-bold">{{ history.serialNumber }}</td>
                            <td>{{ history.logTime }}</td>
                            <td>{{ history.latitude }}</td>
                            <td>{{ history.longitude }}</td>
                            <td class="text-center">{{ history.gear }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import SearchBar from '@/components/SearchBar.vue';

import env from '@/env';
import { onMounted, ref } from 'vue';
import axios from 'axios';

export default {
    components: { TopMenu, SearchBar },
    setup() {
        const today = new Date();
        const initialEndDate = today.toISOString().substr(0, 10);
        const initialStartDate = new Date(today.setDate(today.getDate()-7)).toISOString().substr(0, 10);      // 기본 값은 1주일
        const startDate = ref(initialStartDate);
        const endDate = ref(initialEndDate);

        const operationHistories = ref([]);
        
        onMounted(() => {
            fetchOperationHistoryList();
        });

        const searchBySerialNumber = (serialNumber) => {
            if (serialNumber) {
                // 특정 차량 운행 정보 검색
                fetchOperationHistoryList(serialNumber);
            }
            else {
                // 모든 차량 운행 정보 표시
                fetchOperationHistoryList();
            }
        };

        const fetchOperationHistoryList = (serialNumber = null) => {
            if (startDate.value && endDate.value) {
                // 차량 운행 정보 조회 by 페이지
                axios({
                    url: `${env.baseURL}/car/operation-log`,
                    method: 'get',
                    params: {
                        startDate: startDate.value,
                        endDate: endDate.value,
                        serialNumber: serialNumber,
                    },
                })
                .then((response) => {
                    operationHistories.value = response.data;
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        };

        return {
            startDate,
            endDate,
            operationHistories,
            searchBySerialNumber,
            fetchOperationHistoryList
        }
    },
}
</script>

<style scoped>
.operation-history-table {
    width: 100%;
    border: 0.1px solid rgba(78, 203, 113, 0.4);
    border-radius: 5px;
}
</style>
