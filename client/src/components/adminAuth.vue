<template>
<div class="auth">
	<div class="welcome container-unique">
		<div>
			<div class="auth-header">
				<img class="logo" src="../assets/images/Anachak_logo.svg" alt="">
				<h4>ADMIN LOGIN</h4>
			</div>
			<signin-form @login="enterUserpage"/>
		</div>
	</div>
</div>
</template>

<script>
import SigninForm from '../components/SigninForm.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	components:{
		SigninForm,
	}
	,setup() {
		const showLogin = ref(true);

		const router = useRouter();

		const enterUserpage = () => {
			router.push({name : 'userpage'})
		};

		return {showLogin, enterUserpage}	
	},
}
</script>

<style>
	.welcome{
		text-align: center;
		padding: 20px 0;
	}
	.welcome form{
		width: 300px;
		margin: 20px auto;	
	}
	.welcome label{
		display: flex;
		align-content: left;
	}
	.welcome input{
		width: 95%;
		padding: 10px;
		border-radius: 20px;
		border: 1px solid #eee;
		color: #999;
		outline: none;
		margin: 10px auto;
	}
	.auth-header{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.auth-header .logo{
		margin-right: 0.5rem;
		width: 2rem;
	}
	
</style>