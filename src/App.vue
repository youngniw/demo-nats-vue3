<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import envMap from '@/envMap.js';
import { onMounted } from 'vue';

export default {
  name: 'App',

  setup() {
    onMounted(() => {
      if (window.kakao && window.kakao.maps) ;
      else {
        const script = document.createElement('script');
        script.type = 'text/javascript'
        /* global kakao */
        // script.onload = () => kakao.maps.load(initMap);
        script.src = envMap.kakaoMapUrl;
        document.head.appendChild(script);
      }
    });
  }
}
</script>

<style>
#app {
  font-family: '맑은 고딕', 'Malgun Gothic';
  color: black;
  font-size: 14pt;
  line-height: 1;
  word-break: keep-all;
  -webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
</style>
