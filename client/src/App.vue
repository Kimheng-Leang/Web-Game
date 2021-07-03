<template>
<div >
  <div class="app" id="app">
      <router-view/>
  </div>
</div>

</template>

<script>
import getUser from "./composables/getUser"
export default {
  name:"app",
  methods:{
    logout(){
      this.$store.commit('setToken');
      this.$router.push('/login')
    },
    clickLogin(result){
      console.log(result);
    }
  },
  setup(){
    const {user} = getUser();
    return {user}
  }
}
</script>

<style >
:root{
    --primary-color: #D72323;
    --light-color: #EEEEEE;
    --black-color: #303841;
    --dark-color: #3A4750;
    --max-width: 1100px;
    --star-size: 2rem;
    --star-color: #fff;
    --star-background:  rgb(220, 53, 69);
  }
</style>