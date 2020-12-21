<script>
    //🦖🦖🦖 - unused imports 
    // import { FirebaseApp, User, Doc, Collection } from "sveltefire";
    // import firebase from "firebase/app";
    // import "firebase/auth";
    import { user } from "./models";

    export let auth, error, view;
</script>

        <div class="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="email-address" class="sr-only">Email address</label>
                    <input
                        id="email-address"
                        name="email"
                        type="email"
                        autocomplete="email"
                        bind:value={$user.email}
                        required
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address" />
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
                        class="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password" />
                </div>
            </div>
            <div>
                <!--🦖🦖🦖 - autofocus not needed there, and not advised https://www.a11yproject.com/checklist/#avoid-using-the-lesscodegreaterautofocusless/codegreater-attribute -->
                <button
                autofocus={true}
                    on:click={() => auth
                            .signInWithEmailAndPassword(
                                $user.email,
                                $user.password
                            )
                            .catch((err) => {
                                error.code = err.code;
                                error.message = err.message;
                                error.flag = true;
                            })}
                    class="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span
                        class="absolute inset-y-0 left-0 flex items-center pl-3">
                        <!-- Heroicon name: lock-closed -->
                        <svg
                            class="w-5 h-5 text-indigo-500 group-hover:text-indigo-400"
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
                    Sign in
                </button>
            </div>
            <p class="mt-2 text-sm text-center text-gray-600">
                Or
                <!-- 🦖🦖🦖 type="button" , same for signup -->
                <button
                type="button"
                    on:click={() => view = 1}
                    class="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign Up
                </button>
            </p>
        </div>