import {ref} from "vue"
import { projectFirestore } from "../firebase/config"

const useDocument =(collection, id)	=> {
	const error = ref(null)
	const pending = ref(false)
	let docRef = projectFirestore.collection(collection).doc(id)

	const deleteDoc = async () =>{
		pending.value = true
		error.value = null
		try{
			const res = await docRef.delete()
			pending.value = false
			console.log("Success")
			return res
		}catch(err){
			console.log(err.message)
			pending.value = false
			error.value ="Can not delete"
			console.log(err.message)
		}

	} 
	return {error, pending, deleteDoc}
}
export default useDocument