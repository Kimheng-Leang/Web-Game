import {ref , watchEffect} from 'vue'
import { projectFirestore } from '../firebase/config'
import getUser from "./getUser"
const getCollection = (collection) =>{
	const document = ref(null)
	const error = ref(null)
	const {user} = getUser()
	let collectionRef = projectFirestore.collection(collection)
		.orderBy('createdAt')
	const unsub = collectionRef.onSnapshot((snap) => {
		let results = []
		console.log("snap shot")
		snap.docs.forEach((doc) => {
			doc.data().createdAt && doc.data().user_email === user.value.email && results.push({ ...doc.data(), id: doc.id})
		})
		document.value = results
		error.value = null
	}, (err) =>{
		console.log(err.message)
		document.value = "Could not fetching"
	})

	watchEffect((oninvalid) => {
		oninvalid(()=>unsub())
	})

	return {document , error}
}

export default getCollection