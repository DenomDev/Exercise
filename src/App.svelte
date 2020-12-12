<script>
	import { FirebaseApp, User, Doc, Collection } from "sveltefire";
	import firebase from "firebase/app";
	import "firebase/firestore";
	import "firebase/auth";
	import "firebase/performance";
	import "firebase/analytics";
	import SignIn from "./SignIn.svelte";
	import Entry from "./Entry.svelte";
	import Account from "./Account.svelte";

	const config = {
		apiKey: "AIzaSyBShi3-2yOvgv2OKSUzCpP8mkKerxseaRY",
		authDomain: "exercise-8b151.firebaseapp.com",
		projectId: "exercise-8b151",
		storageBucket: "exercise-8b151.appspot.com",
		messagingSenderId: "1004565852844",
		appId: "1:1004565852844:web:da67564b9edf0a3d1ba509",
	};
	firebase.initializeApp(config);

	let _auth = firebase.auth()

	firebase.auth().onAuthStateChanged((user) => {

	})
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
	<User let:user let:auth>
		<Collection
			path={'users'}
			let:data={usersData}
			let:ref={usersDataRef}
			log>

			<Doc
				path={usersDataRef.doc(user.uid)}
				let:data={userData}
				let:ref={userDataRef}
				log>
				<Account {userData} {usersData} bind:auth={_auth} />

				<span slot="loading">Loading data...</span>
			</Doc>
		</Collection>
		<div slot="signed-out">
			<Entry {auth} />
		</div>
	</User>
</FirebaseApp>
