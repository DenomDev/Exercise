<script>
    //🦖🦖🦖 - why  importing it ?
    //import { FirebaseApp, User, Doc, Collection } from "sveltefire";
    //import firebase from "firebase/app";
    //import "firebase/auth";
    import { user, error } from "./models";
    import SignIn from "./SignIn.svelte";
    import SignUp from "./SignUp.svelte";
    //import { fade } from "svelte/transition";

    export let auth;

    let error_value;
    error.subscribe((value) => (error_value = value));

    let view = 0;

</script>

<div
    class="flex items-center justify-center min-h-screen px-4 py-12 bg-gray-50 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div>
            <img
                class="w-auto h-12 mx-auto"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt="Workflow" />
            <h2 class="mt-6 text-3xl font-extrabold text-center text-gray-900">
                Sign in to your account
            </h2>
        </div>
        {#if error_value.flag}
            <p class="mt-2 text-sm text-center text-red-600">
                {error_value.message}
            </p>
        {/if}

        <div class="flex w-full">
    
            <!-- //🦖🦖🦖 - hidden  cause some issues there, you're getting warnings and errors (vid). You could simply use if else de svelte  -->
            <!-- <div class="w-full {view == 0 ? '' : 'hidden'}">
                <SignIn bind:auth bind:error={error_value} bind:view={view}/>
            </div>
            <div class="w-full {view == 1 ? '' : 'hidden'}">
                <SignUp bind:auth bind:error={error_value} bind:view={view}/>
            </div> -->
            <div class="w-full">
                {#if view}
                    <SignUp bind:auth bind:error={error_value} bind:view={view}/>
                {:else}
                    <SignIn bind:auth bind:error={error_value} bind:view={view}/>   
                {/if}
            </div>
        </div>
    </div>
</div>
{#if false}
    <p>{JSON.stringify($user, 0, 4)}</p>
    <p>{JSON.stringify(error_value, 0, 4)}</p>
{/if}
