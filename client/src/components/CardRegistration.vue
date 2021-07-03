<template>
  <div>
	  <form action="">
		<div v-if="cardNumber[0] === '4'" style="display:flex; align-items:center">
			<p style="text-align:center">
				You are using :
			</p>
			<i
              class="fab fa-cc-visa"
              style="font-size: 40px; padding: 2px"
            ></i>
		</div>
		<div v-if="cardNumber[0] === '5' && cardNumber[1] === '1'"><i
              class="fab fa-cc-mastercard"
              style="font-size: 40px; padding: 2px"
            ></i></div>
		<div>
			<label>Fullname of cardholder</label>
			<input type="string" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Card Number</label>
			<input type="number" v-model="cardNumber"  required/>
			<span class="validity"></span>
			{{cardNumber}}
		</div>
		<div>
			<label>Expired Date</label>
			<input type="month" min="now" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>CVV</label>
			<input class="cvv" type="number" min="0" max="999" required/>
			<span class="validity"></span>
			
			<button>Add Card</button>
			
		</div>
		
	  </form>
  </div>
</template>

<script>
export default {
	data(){
		return {
			cardNumber : "",
		}
	},


}
</script>

<style scoped>
	input{
		margin: 5px;
	}
	.cvv{
		width: 10%;
	}
	div {
  	margin-bottom: 10px;
	}

	input:invalid+span:after {
	content: '✖';
	padding-left: 5px;
	}

	input:valid+span:after {
	content: '✓';
	padding-left: 5px;
	}
</style>