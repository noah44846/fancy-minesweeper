<template>
  <div id="app">
    <Navbar />
    <div
      class="d-flex flex-column justify-content-center align-items-center h-100"
    >
      <RouterView />
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  components: {
    Navbar,
  },
};
</script>
