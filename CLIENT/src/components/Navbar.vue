<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <RouterLink
          :to="{ path: '/' }"
          class="navbar-brand"
          :title="pageTitle"
        >
          {{ pageTitle }}
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <RouterLink :to="{ path: '/games' }" class="nav-link" title="Games">
              Games
            </RouterLink>
            <RouterLink :to="{ path: '/games' }" class="nav-link" title="Games">
              Games
            </RouterLink>
            <RouterLink :to="{ path: '/games' }" class="nav-link" title="Games">
              Games
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import router from "../backend";

export default {
  data() {
    return {
      pageTitle: process.env.VUE_APP_TITLE,
    };
  },
  computed: {
    currentPage() {
      return router.currentRoute.path;
    },
  },
};
</script>