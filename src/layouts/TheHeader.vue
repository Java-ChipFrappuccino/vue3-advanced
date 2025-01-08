<template>
  <header>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="#">Navbar</a> -->
        <RouterLink class="navbar-brand" to="/">끄적끄적</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/"
                >Home</RouterLink
              >
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/about"
                >About</RouterLink
              >
              <!-- <a class="nav-link" href="#">About</a> -->
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/posts"
                >게시글</RouterLink
              >
              <!-- <a class="nav-link" href="#">About</a> -->
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/nested"
                >Nested</RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" active-class="active" to="/my"
                >MyPage</RouterLink
              >
            </li>
          </ul>
          <div class="d-flex" role="search">
            <button
              @click="goPage()"
              class="btn btn-outline-success"
              type="button"
            >
              글쓰기
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const goPage = () => {
  router.push({
    name: "PostCreate",
  });
};
</script>

<style scoped></style>
