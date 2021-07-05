<template>
  <div class="card-border">
	  <h4 class="title">Card registration</h4>
	  <p v-if="error">{{ errorMessage }}</p>
	  <form @submit.prevent="addCard">
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
			<input type="string" v-model="fullName" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Card Number</label>
			<input type="number" v-model="cardNumber"  required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Expired Date</label>
			<input v-model="ExpiredDate" type="month" min="now" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>CVV</label>
			<input class="cvv" type="number" min="0" v-model="CVV" max="999" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Top up money</label>
			<input class="money" type="number" v-model="amount" step="0.00000001" required/>
			<span class="validity"></span>
			<input type="submit" value="Add Card"/>
		</div>
	  </form>
  </div>
</template>

<script>
import getUser from '../composables/getUser'
import useCollection from "../composables/useCollection"
import { timestamp } from '../firebase/config'
export default {
	data(){
		return {
			cardNumber : '',
			CVV : '',
			ExpiredDate : "",
			fullName : "",
			amount : "",
			error: false,
			errorMessage : ""
		}
	},
	methods:{
		addCard(){
			const {error,addDoc} = useCollection("card")
			const {user} = getUser()
			//check
			const doc = {
				CVV : this.CVV,
				card_number : this.cardNumber,
				expired_date : this.ExpiredDate,
				createdAt : timestamp(),
				card_name: "Veyseng",
				user_email : user.value.email,
				amount : this.amount,
				fullName : this.fullName
			}
			addDoc(doc)

		}
	}


}
</script>

<style scoped>
	.card-border{
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid white;
		border-radius: 10px;
	}
	input{
		margin: 5px;
	}
	.cvv{
		width: 10%;
	}
	.title{
		background: white;
		color: var(--primary-color);
		font-weight: bold;
		padding: 1px;
		border-radius: 5px;
	}
	div {
  	margin-bottom: 10px;
	}

	input:invalid+span:after {
	content: '✖';
	padding-left: 5px;
	color: red;
	}

	input:valid+span:after {
	content: '✓';
	padding-left: 5px;
	}
</style>