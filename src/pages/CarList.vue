<template>
  <v-container class="car-list ma-0 pa-1 d-flex flex-column flex-wrap" fluid>
        <v-row class="flex-grow-0">
            <TopMenu title="차량 목록"></TopMenu>
        </v-row>

        <v-row class="flex-grow-0 mx-2" justify="end">
            <v-col cols="auto">
                <SearchBar @loadCarInfo="searchBySerialNumber"></SearchBar>
            </v-col>
        </v-row>

        <v-row class="flex-grow-1 mx-2" align="center">
            <v-col>
                <v-container fluid>
                    <v-row justify="center">
                        <v-container class="car-list-container my-3 pa-2" >
                            <v-row style="min-height: 400px;">
                                <v-col class="my-7 px-2 text-center" v-for="car in carList" :key="car.carId" cols="3" align-self="center">
                                    <CarItem :car="car"></CarItem>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-row>

                    <v-row class="mt-10" justify="center">
                        <v-pagination
                            v-model="currentPage"
                            active-color="rgb(78, 203, 113)"
                            color="#888888"
                            :length="pageSize"
                            total-visible="10"
                            variant="outlined"
                        >
                        </v-pagination>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import TopMenu from '@/components/TopMenu.vue';
import SearchBar from '@/components/SearchBar.vue';
import CarItem from '@/components/CarItem.vue';

import { onMounted, ref, watch } from 'vue';
import axios from 'axios';
import env from '@/env';

export default {
    components: { TopMenu, SearchBar, CarItem },
    setup() {
        const pageSize = ref(1);
        const currentPage = ref(1);
        const carList = ref([]);

        onMounted(() => {
            fetchCarList();
        })

        watch((currentPage), (val, oldVal) => {
            // 페이지에 대한 내용 조회
            fetchCarList(val);
        });

        const searchBySerialNumber = (serialNumber) => {
            // 입력한 차량 번호에 대해 조회
            currentPage.value = 1;
            
            if (serialNumber) {
                // 차량 검색
                fetchCarList(1, serialNumber);
            }
            else {
                // 모든 차량 목록 표시 (페이지 == 1)
                fetchCarList();
            }
        };

        const fetchCarList = (page = 1, serialNumber = null) => {
            // 차량 목록 조회 by 페이지
            axios({
                url: `${env.baseURL}/car/list`,
                method: 'get',
                params: {
                    page: page,
                    serialNumber: serialNumber,
                },
            })
            .then((response) => {
                pageSize.value = response.data.totalPages;
                carList.value = response.data.cars;
            })
            .catch((error) => {
                console.log(error);
            });
        };

        return {
            pageSize,
            currentPage,
            carList,
            searchBySerialNumber,
        }
    },
}
</script>

<style scoped>
.car-list {
    height: 100%;
}
.v-row {
    margin: 0;
}
.v-col {
    padding: 0;
}
.car-list-container {
    border: 0.1px solid #AAA;
    border-radius: 5px;
}
</style>
