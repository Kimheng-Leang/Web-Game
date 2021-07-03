import {ref} from 'vue'
import { projectFirestore } from "../firebase/config"

const useCollection = (collection) => {
	//initialize the error is null
	const error = ref(null);
	const addDoc = async (doc) =>{
		error.value = null
		try{
			await projectFirestore.collection(collection).add(doc)
		}catch(err){
			error.value = "Could not store the items"
			console.log(err.message)
		}	
	}
	return {error, addDoc}
}
export default useCollection