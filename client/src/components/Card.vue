<template>
  <div class="credit_card">
            <div style="display: flex;">
              <i
              class="fab fa-cc-visa"
              style="font-size: 40px; margin-right: 0.5rem"
            ></i>
            <div class="card_infor">
              <span>**** **** **** 7444</span>
              <span>Expiration 01/23</span>
            </div>
            </div>
            <!-- there are several kind of credit card such paypal, visa, master, ... -->
            <button>
              REMOVE
              <i class="far fa-times-circle"></i>
            </button>
          </div>
</template>

<script>
export default {

}
</script>

<style scoped>
	
div.credit_card {
  border: 2px solid red;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
div.credit_card > button {
  color: aliceblue;
  background-color: red;
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