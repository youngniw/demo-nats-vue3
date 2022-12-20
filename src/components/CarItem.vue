<template>
    <v-container class="ma-0 pa-0">
        <v-row align="center" justify="center">
            <v-col cols="auto">
                <v-img class="car-img" width="120px" height="120px" :src="require('@/assets/icon/ic_car_list.png')" contain></v-img>
            </v-col>
        </v-row>

        <v-row class="mt-4 font-weight-bold" align="center" justify="center">
            {{ car.serialNumber }}
        </v-row>
        <!-- <v-row class="car-state" align="center" justify="center">
            <span v-if="car.gear===1" class="text-grey">대기중</span>
            <span v-else class="text-blue">운행중</span>
        </v-row> -->
    </v-container>
</template>

<script>
export default {
    props: {
        car: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
.car-img {
    border: 0.1px solid black;
}
.car-state {
    font-size: 12pt;
}
</style>
