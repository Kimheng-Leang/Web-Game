import {ref , watchEffect} from 'vue'
import { projectFirestore } from '../firebase/config'
import getUser from "./getUser"
const getWishlist = (gameid) =>{
	const id = ref(null)
	const error = ref(null)
	const {user} = getUser()
	let collectionRef = projectFirestore.collection("wishlist")
		.orderBy('createdAt')
	const unsub = collectionRef.onSnapshot((snap) => {
		let results = []
		console.log("snap shot")
		snap.docs.forEach((doc) => {
			doc.data().createdAt && gameid === doc.game_id && doc.data().user_email === user.value.email && results.push({ ...doc.data(), id: doc.id})
		})
		id.value = results
		error.value = null
	}, (err) =>{
		console.log(err.message)
		document.value = "Could not fetching"
	})

	watchEffect((oninvalid) => {
		oninvalid(()=>unsub())
	})

	return {id , error}
}

export default getWishlist