<script>
	import { FirebaseApp, User, Doc, Collection } from "sveltefire";
	import firebase from "firebase/app";
	import "firebase/firestore";
	import "firebase/auth";
	import "firebase/performance";
	import "firebase/analytics";
	//import SignIn from "./SignIn.svelte";
	import Entry from "./Entry.svelte";
	import Account from "./Account.svelte";

	//🦖🦖🦖 - never show this in public repos 
	const config = {
	
	};
	firebase.initializeApp(config);

	//🦖🦖🦖 - why there?
	//let _auth = firebase.auth()

	//🦖🦖🦖 - purpose ?
	//firebase.auth().onAuthStateChanged((user) => {

	// })
</script>

<style global lang="postcss">
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>

{#if !config.projectId}
	<strong>Step 0</strong>
	Create a
	<a href="https://firebase.google.com/">Firebase Project</a>
	and paste your web config into
	<code>App.svelte</code>
	.
{/if}

<FirebaseApp {firebase}>
<!--🦖🦖🦖 persist={localStorage} to avoid 'login view flashing' on reload -->	
	<User persist={localStorage} let:user let:auth>
		
		<!-- 🦖🦖🦖 Moving following Collection users and Doc  user to Account 
			as we used them only there (better to keep components independent as much as possible   )
			
			<Collection
			path={'users'}
			let:data={usersData}
			let:ref={usersDataRef}
			log>

			<Doc
				path={usersDataRef.doc(user.uid)}
				let:data={userData}
				let:ref={userDataRef}
				log> -->
				<Account uid={user.uid} {auth} />

				<span slot="loading">Loading data...</span>
			<!-- </Doc>
		</Collection> -->
		<div slot="signed-out">
			<Entry {auth} />
		</div>
	</User>
</FirebaseApp>
