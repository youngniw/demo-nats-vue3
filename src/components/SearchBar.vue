<template>
    <v-text-field
        v-model="serialNumber"
        clearable
        density="comfortable"
        label="차량 번호 검색"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        style="width: 220px;"
        @click:clear="searchCarCancel"
        @keyup.enter="searchBySerialNumber"
        hide-details="true"
    >
    </v-text-field>
</template>

<script>
import { ref } from 'vue';

export default {
    emits: ['loadCarInfo'],
    setup(props, { emit }) {
        const serialNumber = ref(undefined);

        // 차량 검색 취소
        const searchCarCancel = () => {
            emit('loadCarInfo', null);
        };

        // 차량 검색
        const searchBySerialNumber = () => {
            // 입력한 차량 번호에 대해 조회 + 마커 이미지 변경
            emit('loadCarInfo', parseInt(serialNumber.value));
        };

        return {
            serialNumber,
            searchCarCancel,
            searchBySerialNumber
        };
    }
}
</script>

<style>
.v-row {
    margin: 0;
}
.v-col {
    padding: 0;
}
</style>