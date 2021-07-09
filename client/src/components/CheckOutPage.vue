<template>
    <div>
        <Header msg="LOG IN" Hightlight="highlight_Store"/>
        <main>
            <section>
                <router-link  to="/Store" class="link">
                    <div class="Back-to-store">
                        <i class="fas fa-arrow-left set-color" style="color:red;"></i> BACK TO STORE
                    </div>
                </router-link>
            <div class="order_user">YOUR ORDER</div>
            <div class="order_inform">
                <div class="information left_side">
                    <div class="pic_title_game">
                        <div class="pic_game" :style="{'background-image': `url(${game.image})`}">
                            
                        </div>
                        <div class="title_game">
                            <div style="font-weight: bold; word-wrap: break-word;">
                                {{game.title}}
                            </div>
                            <div v-if="game.support_os=='WINDOW'" class="icon_os">
                                <i class="fas fa-border-all"></i>
                            </div>
                            <div v-else-if="game.support_os=='APPLE'" class="icon_os">
                                <i class="fab fa-apple"></i>
                                <i class="fas fa-border-all" style="margin-left:1rem"></i>
                            </div>
                            <div v-else class="icon_os">
                                <i class="fab fa-apple"></i>
                                <i class="fas fa-border-all" style="margin-left:1rem"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="information right_side">
                    <div class="price_game" style="font-weight: lighter;">
                        PRICE: <b>{{game.price}} RIELS</b>
                    </div>
                    <!-- <div class="total_size_game" style="font-weight: lighter;">
                        TOTAL SIZE:<b> 20 GB</b>
                    </div> -->
                </div>
            </div>
            <div class="total_price_game">
                TOTAL: {{game.price}} RIELS
            </div>
                <div class="name_id_user">
                    <span >CUSTOMER NAME : {{userDisplayName}}</span>
                    <span >CUSTOMER ID : {{userID}}</span>
                    <span >CUSTOMER EMAIL : {{userEmail}}</span>
                    <ul class="buy_button" >
                        <li v-if="!forFriend" @click="buyProduct">BUY FOR MYSELF</li>
                        <li v-if="!buy" @click="buyForFriend">GIFE FOR FRIENDS</li>
                    </ul>
                </div>
            <div v-if="buy">
                <div v-if="errorStatus" class="error">
                        {{ errorMessage }}
                </div>
                <div v-if="cards < 1">

                </div>
                <div v-else class="buy-form">
                    
                    <div v-for="card in cards" :key="card.id" style="display:flex; align-items:center">
                        <input type="Radio" class="radio-btn" id="card.id" @click="select(card)"  name="payment" value="card.id">
                        <div class="card-display">
                            <i
                                class="fab fa-cc-mastercard"
                                style="font-size: 30px; margin-right: 0.5rem"
                                v-if="card.card_number[0] === '5' && card.card_number[1] === '1'"
                            ></i> 
                            <i
                                class="fab fa-cc-visa"
                                style="font-size: 30px; margin-right: 0.5rem"
                                v-if="card.card_number[0] === '4' "
                            ></i>   
                            **** **** **** {{ card.card_number.substring(12,16) }}
                        </div>
                         
                    </div>
                    {{pick}}
                    <button @click="purchaseNow" class="purchase-btn">Purchase Now</button>
                </div>
                
            </div>
            <div v-if="forFriend">
                <div v-if="errorStatus" class="error">
                        {{ errorMessage }}
                </div>
                <div v-if="cards < 1">

                </div>
                <div v-else class="buy-form">
                    <input type="email" v-model="friend_email" placeholder="Enter Your Friend's Valid Email Address" required>
                    <div v-for="card in cards" :key="card.id" style="display:flex; align-items:center">
                        <input type="Radio" class="radio-btn" id="card.id" @click="select(card)"  name="payment" value="card.id">
                        <div class="card-display">
                            <i
                                class="fab fa-cc-mastercard"
                                style="font-size: 30px; margin-right: 0.5rem"
                                v-if="card.card_number[0] === '5' && card.card_number[1] === '1'"
                            ></i> 
                            <i
                                class="fab fa-cc-visa"
                                style="font-size: 30px; margin-right: 0.5rem"
                                v-if="card.card_number[0] === '4' "
                            ></i>   
                            **** **** **** {{ card.card_number.substring(12,16) }}
                        </div>
                         
                    </div>
                    {{pick}}
                    <button @click="purchaseNowFriend" class="purchase-btn">Purchase Now</button>
                </div>
                
            </div>
        </section>
    </main>
<Footer/>
    </div>
</template>

<script>
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useRoute } from 'vue-router'
import getUser from "../composables/getUser"
import getCollection from "../composables/getCollection"
import {computed} from "vue"
import useCollection from "../composables/useCollection"
import { timestamp } from '../firebase/config'
import useDocument from "../composables/useDocument"
export default {
    data(){
        return{
            errorStatus : true,
            errorMessage : "* You add to select a card or add new card on User Page",
            game:{
                id:'',
                image:'',
                title:'',
                price:'',
                support_os:'',
            },
            pick:'',
            user:{
                uid: "",
                displayName: ""
            },
            buy: false,
            forFriend:false,
            selectedCard : {},
            friend_email : "",
        }
    },
    methods:{
        buyProduct(){
            this.buy = !this.buy
        },
        buyForFriend(){
            this.forFriend = !this.forFriend
            //Check email if exist in our authentication
            //
        },
        purchaseNowFriend(){
             if(!this.errorStatus){
                //Check the game price and the avaible balance the card balance need to be greater than 
                let gamePrice = parseFloat(this.game.price)
                let cardBalance = parseFloat(this.selectedCard.amount)
                if(this.friend_email !== ""){
                    if(cardBalance > gamePrice){
                    console.log("Can make the purchase")
                    const cardBalanceAfter = cardBalance - gamePrice
                    console.log(cardBalanceAfter)
                    //update a payment receipt
                    
                    //update the card value
                    const {updateDoc} = useDocument("card", this.selectedCard.id)
                    updateDoc(cardBalanceAfter.toString())

                    const { user } = getUser()
                    //Check if document has the game id match with the paid
                    
                    const paidGame = {
                        user_email : this.friend_email,
                        id : this.game.id,
                        createdAt : timestamp(),
                        game_title : this.game.title,
                        status : "gifted from " + this.userEmail,
                        game_image_path : this.game.image
                    }
                    const {addDocument} = useCollection("paid")
                    addDocument(paidGame)
                }else{
                this.errorStatus = true;
                this.errorMessage = "You don't have enough balance"
                }
                }else{
                    this.errorStatus = true;
                    this.errorMessage = "You need to enter your friend's email"
                }
                
            }
        }
        ,
        purchaseNow(){
            //check if the select card is empty
            if(!this.errorStatus){
                //Check the game price and the avaible balance the card balance need to be greater than 
                let gamePrice = parseFloat(this.game.price)
                let cardBalance = parseFloat(this.selectedCard.amount)
                if(cardBalance > gamePrice){
                    console.log("Can make the purchase")
                    const cardBalanceAfter = cardBalance - gamePrice
                    console.log(cardBalanceAfter)
                    //update a payment receipt
                    
                    //update the card value
                    const {updateDoc} = useDocument("card", this.selectedCard.id)
                    updateDoc(cardBalanceAfter.toString())

                    const { user } = getUser()
                    //Check if document has the game id match with the paid
                    
                    const paidGame = {
                        user_email : user.value.email,
                        id : this.game.id,
                        createdAt : timestamp(),
                        game_title : this.game.title,
                        status : "paid",
                        game_image_path : this.game.image
                    }
                    const {addDocument} = useCollection("paid")
                    addDocument(paidGame)
                }else{
                this.errorStatus = true;
                this.errorMessage = "You don't have enough balance"
                }
            }
        },
        select(id){
            this.selectedCard = id
            console.log(this.selectedCard)
            this.errorStatus = false
        }

    },
    components:{
        Header,
        Footer
    },
    computed:{
        userDisplayName(){
            const {user} = getUser()
            if(user.value){
                return user.value.displayName
            }
            return ""
        },
        userEmail(){
            const {user} = getUser()
            if(user.value){
                return user.value.email
            }
            return ""
        },
        userID(){
            const  {user} = getUser()
            if(user.value){
                return user.value.uid
            }
            return ""
        },
       
        
    },
    setup(){
        const {error, document} = getCollection("card");
		const cards = computed(() => {
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

        return {error, document, cards,deleteCard}
    },
    async mounted(){
        const route = useRoute();
        const game_id=route.params.id;
        const response = await axios.get(`http://localhost:2000/admin/getGames/${game_id}`);
        this.game.id=response.data._id;
        this.game.title=response.data.Title;
        this.game.price=response.data.Price;
        this.game.image=require('../../../server/public/'+response.data.Files[0]);
        this.game.support_os=response.data.SupportOS;
    },
    
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap');
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
main{
    color: white;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    background-color:  #303841;
    min-height: 90vh;
}
main section{
    display: block;
    align-items: center;
    padding: 2rem 10rem 2rem 10rem;
}
.link{
    color:white;
    text-decoration: none;
    
}
.Back-to-store{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 10rem;
    border-radius: 1rem;
    padding: 0.2rem 0.5rem 0.2rem 0.5rem;
    border:1px solid var(--primary-color);
    cursor: pointer;
}
div.order_user {
    border-bottom : 0.1em solid #C4C4C4;
    padding-bottom: 0.8em;
    margin-bottom : 2em;
    margin-top :2em;
}
div.order_inform {
    display        : flex;
    justify-content: space-between;
}
div.information {
    width : 50%;
    height: 10em;
}
div.pic_title_game {
    display: flex;
}
li{
    margin:1rem;
}
div.pic_game {
    width: 11rem;
    height: 13rem; 
    background-size:100%;
    background-repeat: no-repeat;
}

div.title_game {
    margin-left: 3em;
}
div.icon_os {
    font-size : 24px;
    margin-top: 0.2em;
}

div.information.right_side {
    width           : 30%;
}

div.price_game {
    direction: rtl;
    margin-bottom: 0.2em;
}

div.total_size_game {
    direction: rtl;
    margin-top: 0.2em;
}

div.total_price_game {
    border-bottom : 0.1em solid #C4C4C4;
    padding-bottom: 2.5rem;
    direction: rtl;
    margin-top: 1rem;
    font-weight: bold;
}
div.name_id_user {
    display: grid;
}
div.name_id_user > span {
    margin-top: 0.8em;
}
div.name_id_user > ul.buy_button {
    margin-top: 1em;
    list-style: none;
    display: flex;
}
div.name_id_user ul.buy_button > li {
    background-color: var(--primary-color);
    padding: 0.5em;
    border-radius: 20px;
    cursor: pointer;
}


div#button_bar {
    width: 100%;
    height: 13em;
    background-color: #3A4750;
    position: absolute;
    top: 229.1em;
    display: flex;
}

.button_bar {
    /* the clild of id #button_bar */
    height: 100%;
}

.button_inform {
    display: flex;
    height: 5em;
    list-style: none;
    justify-content: space-between;
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    padding-bottom: 0.6em;
    align-items: flex-end;
}

.button_bar.copyright {
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    padding-top: 2.5%;
}

div.copyright>div.line {
    height: 0.2em;
    background-color: #FFFFFF;
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    border-radius: 50%;
}

.button_bar>span {
    /* div.copyright class is the parent of this span */
    width: 70%;
    margin-right: auto;
    margin-left: 15%;
    font-size: 0.9em;
}

.button_bar.social_media {
    width: 40%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 16%;
    padding-right: 6%;
}

.logo_social {
    width: 3em;
    height: 3em;
    background-color: #C6C0C0;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.2em solid var(--primary-color);
}
/* Form for buying the game */
.error{
    color: #ff3f80;
}
.buy-form{
    width:50vw;
    padding:10px;
    border: 2px solid white;
    border-radius: 10px;
}
input[type='radio']:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: #d1d3d1;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
    input[type='email']{
        color: black;
        width: 30vw;
        border-radius: 10px;
        outline: none;
    }
    input[type='radio']:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        position: relative;
        background-color: var(--primary-color);
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid white;
    }
    .radio-btn{
        margin-right: 3px;
    }
    .card-display{
        padding: 2px;
        margin: 5px;
    }
    .purchase-btn{
        background: var(--primary-color);
        outline: none;
        border-radius: 10px;
        color: white;
        padding: 1px 2px;
        border: none;
    }
</style>