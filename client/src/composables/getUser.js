import { ref } from "vue";
import {projectAuth} from "../firebase/config"

const user = ref(projectAuth.currentUser);

projectAuth.onAuthStateChanged((_user) => {
	console.log(`User state change and the current user is ${_user.displayName}`);
	user.value = _user;
})

const getUser = () =>{
	return { user };
}

export default getUser;