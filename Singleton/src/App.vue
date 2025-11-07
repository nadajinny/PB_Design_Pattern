<template>
  <div class="app">
    <h1>Vue + TypeScript Singleton Demo</h1>
    <button @click="useSingleton">Singleton 테스트</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Singleton from "./Singleton";

export default defineComponent({
  name: "App",
  setup() {
    const useSingleton = () => {
      // 동일 인스턴스 획득
      const s1 = Singleton.getInstance();
      const s2 = Singleton.getInstance();

      // 메서드 호출
      s1.sayHello();
      s2.log("버튼 클릭으로 Singleton 사용!");

      // 같은 객체인지 확인
      console.log("같은 인스턴스인가?", s1 === s2); // true
    };

    return { useSingleton };
  },
});
</script>

<style scoped>
.app {
  text-align: center;
  margin-top: 100px;
}
button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background-color: #42b983;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background-color: #369870;
}
</style>
