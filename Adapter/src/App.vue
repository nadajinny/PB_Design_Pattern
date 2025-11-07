<template>
  <div class="app">
    <h1>🔌 Adapter Pattern Demo</h1>

    <div class="button-group">
      <button @click="runAdapter">Run Adapter Pattern</button>
    </div>

    <p class="hint">
      👉 버튼을 클릭하면 콘솔(DevTools → Console 탭)에<br />
      Adapter 패턴 동작 로그가 출력됩니다.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import runAdapterPattern from "./adapterPattern";

export default defineComponent({
  name: "App",
  setup() {
    const runAdapter = () => {
      runAdapterPattern(5000); // 5000원 결제 시뮬레이션
    };

    return { runAdapter };
  },
});
</script>

<style scoped>
.app {
  text-align: center;
  margin-top: 80px;
  font-family: "Segoe UI", Roboto, sans-serif;
}

h1 {
  color: #42b983;
  margin-bottom: 24px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background-color: #42b983;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
}

button:hover {
  background-color: #369870;
}

.hint {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.6;
}
</style>
