<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"></a>
        <img src="./assets/itts-big.png" alt="Logo" width="45" height="60" class="d-inline-block align-text-top">
        
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link" aria-current="page">HOME</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'views.index'}" class="nav-link">DAFTAR PINJAMAN</router-link>
            </li>
          </ul>
          <!-- <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-success" type="submit">Search</button>
          </form> -->
        </div>
      </div>
    </nav>

    <!-- render vue router -->
    <router-view></router-view>

  </div>
</template>

<script>
  export default {

  }
</script>

<style>
 body {
   background-color: rgb(25, 25, 29) !important;
 }
 .mt-custom {
   margin-top: 110px;
 }
 
</style>