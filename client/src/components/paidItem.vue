<template>
<div>
  <div v-if="formatteddocument < 1">
    <p style="color:grey;">There is no game </p>
  </div>
  <div v-else v-for="item in formatteddocument" :key="item.id">
  <div class="credit_card" >
            <div style="display: flex;" >
				<div class="Game-img" :style="{'background-image': `url(${item.game_image_path})`}">	
				</div>
				<div class="card_infor">
					<span>Game title: {{item.game_title}}</span>
					<span>transaction ID: {{item.id}}</span>
					<span>Status: {{item.status}}</span>
				</div>
            </div>
            
    </div>
</div>

</div>
  
</template>

<script>
import getCollection from "../composables/getCollection"
import useDocument from "../composables/useDocument"
import { computed } from '@vue/runtime-core'

export default {
  setup(){
    const {error, document} = getCollection("paid");
		const formatteddocument = computed(() => {
			if(document.value){
				return document.value.map(doc => {
					return doc
				})
			}else{
				return null
			}
		})

		return {error, document, formatteddocument}
  }, 
}
</script>

<style scoped>
	
div.credit_card {
	margin-top: 5px;
	margin-bottom: 5px;
	border: 2px solid var(--primary-color);
	border-radius: 10px;
	padding: 2px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
div.credit_card > button {
  color: aliceblue;
  background-color: var(--primary-color);
  font-weight: 900;
  width: 5rem;
  font-size: 10px;
  border-radius: 50px;
  border: none;
  width: 4.5rem;
  padding: 2px 0 2px 0 ;
  margin-right: 1rem;
}
div.card_infor {
  display: grid;
  font-size: 1rem;
  margin-left: 5rem;
  align-items: center;
}

.Game-img{
    width: 6rem;
    height: 6rem;  
    background-size:100%;
    background-repeat: no-repeat;
    margin-right: 1rem;
    border-radius: 10px;
	margin: 5px;
}

</style>