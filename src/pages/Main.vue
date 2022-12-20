<template>
    <v-container class="main ma-0 pa-1 d-flex flex-column flex-wrap" fluid>
        <v-row class="flex-grow-0">
            <v-col class="text-right pa-2">
                <span class="me-1" style="color: #777777;">Today:</span> {{ date }}
            </v-col>
        </v-row>

        <v-row class="flex-grow-1">
            <v-col class="text-center font-weight-bold" align-self="center">
                NATS 데모 프로젝트
                <v-img max-height="350px" :src="require('@/assets/icon/ic_car_main.png')" contain></v-img>
            </v-col>
        </v-row>

        <v-row id="main-menu" class="main-menu flex-grow-0 mx-10 my-8 pa-5" align="center" justify="space-between">
            <v-col class="font-weight-bold">
                <router-link :to="{name: 'SearchCar'}">나의 차량 찾기</router-link>
            </v-col>

            <v-col class="text-center font-weight-bold">
                <router-link :to="{name: 'CarList'}">차량 목록 조회</router-link>
            </v-col>

            <v-col class="text-right font-weight-bold">
                <router-link :to="{name: 'CarOperationHistory'}">운행 이력 조회</router-link>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    setup() {
        const today = new Date();
        const date = `${today.getFullYear()}.${today.getMonth()}.${today.getDate()}`;

        return {
            date,
        };
    }
}
</script>

<style scoped>
.main {
    height: 100%;
}
.v-row {
    margin: 0;
}
.v-col {
    padding: 0;
}
.main-menu {
    height: 20%;
    min-height: 95px;
    background-color: rgba(78, 203, 113, 0.4);
    border-radius: 15px;
}
#main-menu a {
    padding: 12px;
    border-radius: 5px;
    color: #666666;
    font-size: 16pt;
    text-align: center;
    text-decoration: none;
    text-shadow: 2px 2px white;
}
#main-menu a:hover {
    padding: 12px;
    text-decoration: none;
    background-color: rgba(78, 203, 113, .5);
}
</style>
