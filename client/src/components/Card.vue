<template>
<div>
  <div v-if="formatteddocument < 1">
    <p style="color:grey;">There is no card </p>
  </div>
  <div v-else v-for="card in formatteddocument" :key="card.id">
  <div class="credit_card" >
            <div style="display: flex;" >
              <i
              class="fab fa-cc-visa"
              style="font-size: 40px; margin-right: 0.5rem"
              v-if="card.card_number[0] === '4'"
            ></i>
            <i
              class="fab fa-cc-mastercard"
              style="font-size: 40px; margin-right: 0.5rem"
              v-if="card.card_number[0] === '5' && card.card_number[1] === '1'"
            ></i>
            <div class="card_infor">
              <span>**** **** {{card.card_number.substring(12, 16)}}</span>
              <span>Expiration {{ card.expired_date.substring(2,4)}}/{{ card.expired_date.substring(5,7)}}</span>
            </div>
            </div>
            <!-- there are several kind of credit card such paypal, visa, master, ... -->
            <button @click="deleteCard(card.id)">
              REMOVE <i class="far fa-times-circle"></i>
            </button>
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
    const {error, document} = getCollection("card");
		const formatteddocument = computed(() => {
			if(document.value){
				return document.value.map(doc => {
					return doc
				})
			}else{
				return null
			}
		})
    const deleteCard = async (id) => {
      const {deleteDoc} = useDocument("card",id)
      
      await deleteDoc()

      console.log("success",id)
    }

		return {error, document, formatteddocument,deleteCard}
  }, 
}
</script>

<style scoped>
	
div.credit_card {
	margin-top: 5px;
  border: 2px solid var(--primary-color);
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
  font-size: 10px;
  margin-left: 5rem;
}
</style>