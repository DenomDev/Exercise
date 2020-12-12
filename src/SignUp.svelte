<script>
    import { FirebaseApp, User, Doc, Collection } from "sveltefire";
    import firebase from "firebase/app";
    import "firebase/auth";
    import "firebase/firestore";
    import { user } from "./models";

    export let auth, error, view;
    let repeatPassword,
        repeatPasswordError = false;
</script>

<form class="mt-8 space-y-6" action="#" method="POST">
    <input type="hidden" name="remember" value="true" />
    <div class="rounded-md shadow-sm -space-y-px">
        <div>
            <label for="displayName" class="sr-only">Name</label>
            <input
                id="displayName"
                name="displayName"
                type="text"
                autocomplete="name"
                bind:value={$user.displayName}
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Name" />
        </div>
        <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                bind:value={$user.email}
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address" />
        </div>
        <div>
            <label for="phone" class="sr-only">Phone</label>
            <input
                id="phone"
                name="phone"
                type="text"
                autocomplete="phone"
                bind:value={$user.phone}
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Phone number" />
        </div>
        <div>
            <label for="address" class="sr-only">Address</label>
            <input
                id="address"
                name="address"
                type="text"
                autocomplete="address"
                bind:value={$user.address}
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Address" />
        </div>
        <div>
            <label for="password" class="sr-only">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                bind:value={$user.password}
                autocomplete="current-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password" />
        </div>
        <div>
            <label for="repeat-password" class="sr-only">Repeat Password</label>
            <input
                id="repeat-password"
                name="repeat-password"
                type="password"
                bind:value={repeatPassword}
                on:change={() => {
                    repeatPasswordError = $user.password == repeatPassword ? false : true;
                }}
                autocomplete="repeat-password"
                required
                class="appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-b-md {repeatPasswordError ? 'border-red-600' : 'border-gray-300'}"
                placeholder="Repeat Password" />
        </div>
    </div>
    <div>
        <button
            on:click={() => {
                if (!repeatPasswordError) auth.createUserWithEmailAndPassword($user.email, $user.password)
                        .then((m_user) => {
                            firebase
                                .firestore()
                                .collection('users')
                                .doc(m_user.user.uid)
                                .set({
                                    displayName: $user.displayName,
                                    uid: m_user.user.uid,
                                    phone: $user.phone,
                                    email: $user.email,
                                    address: $user.address,
                                });
                        })
                        .catch((err) => {
                            error.code = err.code;
                            error.message = err.message;
                            error.flag = true;
                        });
            }}
            type="button"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: lock-closed -->
                <svg
                    class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                        fill-rule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clip-rule="evenodd" />
                </svg>
            </span>
            Sign Up
        </button>
    </div>
    <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <button
            on:click={() => (view = 0)}
            class="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
        </button>
    </p>
</form>
