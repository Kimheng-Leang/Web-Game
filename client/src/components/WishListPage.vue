<template>
  <div>
    <div>
      <div v-if="formatteddocument < 1">
        <p style="color:grey">There is no Wishlist</p>
      </div>
      <div v-else class="item_buy" v-for="wishlist in formatteddocument" :key="wishlist.game_id">
          <a :href="'/Checkout/'+ wishlist.game_id" >
            <div class="game_item">
              <div class="Game-img" :style="{'background-image': `url(${wishlist.game_image_path})`}"> 
              </div>
              <div>   
                <p>Game title: {{wishlist.game_title}}</p>
                <p>Game price: {{ Number(wishlist.game_price) -  Number(wishlist.game_discount)}} Riels</p>
                <p>Game rating: {{wishlist.game_rating}}/5</p>
              </div>
            </div>
          </a>
          <div>
              <a :href="'/Checkout/'+ wishlist.game_id" >
            <button class="checkout">
              CHECKOUT <i class="fas fa-shopping-cart"></i>
            </button>   
             </a>  
             <button class="checkout" @click="deleteWishlist(wishlist.id)">
              DELETE <i class="fas fa-trash"></i>
            </button>    
          </div>
               
      </div>
    </div>

  </div>
  
</template>

<script>
import { computed } from '@vue/runtime-core'
import getCollection from "../composables/getCollection"
import useDocument from "../composables/useDocument"
export default {
  data(){
    return {
      image:'',
    }
  },
  setup(){
    
    const {error, document} = getCollection("wishlist");
		const formatteddocument = computed(() => {
			if(document.value){
				return document.value.map(doc => {
					return doc
				})
			}else{
				return null
			}
		})
    const deleteWishlist = async (id) => {
      const {deleteDoc} = useDocument("wishlist",id)
      
      await deleteDoc()

      console.log("success",id)
    }

		return {error, document, formatteddocument,deleteWishlist}
  },
}
</script>

<style scoped>
  .item_buy{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .5px solid white;
    margin-bottom: 1rem;
  }
  .game_item{
    display: flex;
    align-items: flex-start;
  }
  .Game-img{
    width: 6rem;
    height: 6rem;  
    background-size:100%;
    background-repeat: no-repeat;
    margin-right: 1rem;
    border-radius: 10px;
}
	button.checkout{
		border-radius: 10px;
		outline: none;
		border:none;
		color: white;
		background-color: var(--primary-color);
    margin-right: 1rem;
	}
	.img_title {
  height: 100%;
  display: flex;
  align-items: flex-end;
}
.img_game {
  height: 100%;
  width: 12rem;
  background-color: rgb(170, 163, 149);
}
ul{
	list-style: none;
}
a{
  text-decoration: none;
  color: white;
}
a:hover{
  color:var(--primary-color);
}
</style>