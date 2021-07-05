<template>
  <div class="card-border">
	  <h4 class="title" style="padding-left:5px">CARD REGISTRATION </h4>
	  <small class="small_note">* We accept only VISA and Master Debit cards</small>
	  <p v-if="error" class="error"><i class="fas fa-exclamation-circle"></i> {{ status_message }}</p>
	  <p v-if="success" class="success"><i class="fas fa-exclamation-circle"></i> {{ status_message }}</p>
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
		<div v-if="cardNumber[0] === '5' && cardNumber[1] === '1'" style="display:flex; align-items:center">
			<p style="text-align:center">
				You are using :
			</p>
			<i
              class="fab fa-cc-mastercard"
              style="font-size: 40px; padding: 2px"
            ></i></div>
		<div>
			<label>Fullname of Cardholder: </label>
			<input type="string" v-model="fullName" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Card Number: </label>
			<input type="number" v-model="cardNumber"  required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Expired Date: </label>
			<input v-model="ExpiredDate" type="month" min="now" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>CVV: </label>
			<input class="cvv" type="number" min="0" v-model="CVV" max="999" required/>
			<span class="validity"></span>
		</div>
		<div>
			<label>Top-up Amount in USD: </label>
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
			status_message : "",
			success: false
		}
	},
	methods:{
		addCard(){
			const {error,addDoc} = useCollection("card")
			const {user} = getUser()
			let flag = false
			let floatNum = parseFloat(this.amount) 
			const card = {
				CVV : this.CVV,
				card_number : this.cardNumber,
				expired_date : this.ExpiredDate,
				createdAt : timestamp(),
				card_name: "Veyseng",
				user_email : user.value.email,
				amount : this.amount,
				fullName : this.fullName
			}
			//check validation
			if(this.CVV.length === 3){
				if(this.cardNumber[0] === "4"){
					if(this.cardNumber.length === 14 || this.cardNumber.length === 16){
						if(floatNum > 0){
							this.error = false
							this.success = true
							this.status_message = "You have successfully registered your card"
							addDoc(card)
							this.cardNumber = ""
							this.CVV = ""
							this.fullname = ""
							this.expiredDate = ""
							this.amount = ""
						}else{
							this.error = true
							this.status_message = "Invalid amount of money"
						}
					}else{
						this.error = true
						this.status_message = "Invalid number of card"
					}
				}else if (this.cardNumber[0] === "5" && this.cardNumber[1] === "1"){
					if(this.cardNumber.length === 16){
						if(floatNum > 0.0){
							this.error = false
							this.success = true
							this.status_message = "You have successfully registered your card"
							addDoc(card)
						}else{
							this.error = true
							this.status_message = "Invalid amount of money"
						}
					}else{
						this.error = true
						this.status_message = "Invalid number of card"
					}
				}else{
					this.error = true
					this.status_message = "The card should be the VISA or MASTER debit card"
				}	
			}else{
				this.error = true
				this.status_message = "CVV should be in 3 digits"
			}
		}
	}


}
</script>

<style scoped>
	.card-border{
		width: 40vw;
		margin-bottom: 10px;
		padding: 10px;
		border: 1px solid white;
		border-radius: 10px;
	}
	input{
		border-radius: 10px;
		margin: 5px;
		outline: none;
		border-color: white;
	}
	input:focus{
		border-color: var(--primary-color);
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
	.small_note{
		font-size: .8rem;
		color: grey;
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
	.error{
		color: #ff3f80;
	}
</style>