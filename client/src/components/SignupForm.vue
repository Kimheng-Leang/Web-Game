<template>
	<form @submit.prevent="handleSubmit">
		<div class="error">{{ error }}</div>
		<input type="text" required placeholder="Enter your name to be called" v-model="displayName">
		<input type="email" required placeholder="Email" v-model="email">
		<input type="password" required placeholder="Password" v-model="password">
		<input type="password" required placeholder="Confirmed Password" v-model="confirmedPassword">
		
		
		<button class="button-auth">Sign up</button>

	</form>
</template>	

<script>
import { ref } from 'vue';
import useSignup from '../composables/useSignup';
export default {
	setup(props, context) {
		const { error, signup} = useSignup()

		const email = ref('');
		const password = ref('');
		const displayName = ref('');
		const confirmedPassword = ref('');
		const role = ref("")
		const handleSubmit = async() => {
			if(confirmedPassword.value === password.value){ 
				role.value = "user"
				await signup(email.value, password.value, displayName.value,role.value);
			}else{
				error.value = "Passwords are not match"
			}
			if(!error.value){
				context.emit('signup');
			}
			email.value = '';
			displayName.value = '';
		}
		return {
			email, password, handleSubmit, displayName, error,confirmedPassword
		}
	},
}
</script>