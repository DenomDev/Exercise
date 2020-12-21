<script>
  import { Collection, Doc } from 'sveltefire';
  import _user_image from './user-solid.svg';

  let apanel = false;
  let account_panel;

  const compare = (a, b) => (a[0][0] > b[0][0] ? 1 : a[0][0] < b[0][0] ? -1 : 0);

  export let auth, uid;
</script>
<!-- 🦖🦖🦖 Collection and Doc moved here from App.svelte--> 

<Collection path={'users'} let:data={usersData} let:ref={usersDataRef} log>
  <Doc path={usersDataRef.doc(uid)} let:data={userData} let:ref={userDataRef} log>
    <nav class="m-0 mb-4 bg-gray-800">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <img class="w-8 h-8" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
            </div>
            <div class="hidden md:block">
              <div class="flex items-baseline ml-10 space-x-4" />
            </div>
          </div>
          <div class="block">
            <div class="flex items-center ml-4 md:ml-6">
              <button
                class="p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                <span class="sr-only">View notifications</span>
                <!-- Heroicon name: bell -->
                <svg
                  class="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              <!-- Profile dropdown -->
              <div class="relative ml-3">
                <div>
                  <button
                    class="text-gray-400 hover:text-white {auth.currentUser.photoURL ? null : 'p-1'} max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu"
                    on:focusin={() => (apanel = true)}
                    on:blur={() => (apanel = false)}
                    aria-haspopup="true">
                    <span class="sr-only">Open user menu</span>
                    {#if auth.currentUser.photoURL != null}
                      <img class="w-8 h-8 rounded-full" src={auth.currentUser.photoURL} alt="" />
                    {:else}
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="user"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        class="w-6 h-6 svg-inline--fa fa-user fa-w-14 fa-spin fa-lg"><path
                          fill="currentColor"
                          d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                          class="" /></svg>
                    {/if}
                  </button>
                </div>
                {#if apanel}
                  <div
                    bind:this={account_panel}
                    class="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu">
                    <span
                      class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      role="menuitem"
                      on:mousedown={() => {
                        auth.signOut();
                        window.location.reload();
                      }}>Sign out</span>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="w-full">
      <p class="text-3xl m-3.5">Your data:</p>

      <section class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <tr class="text-white bg-gray-800">
            {#each Object.entries(userData).sort(compare) as value}
              <th class="text-sm font-semibold uppercase">{value[0]}</th>
            {/each}
          </tr>
          <tr class="text-gray-700">
            {#each Object.entries(userData).sort(compare) as value}
              <td class="px-4 py-3 text-left">{value[1]}</td>
            {/each}
          </tr>
        </table>
      </section>

      <p class="text-3xl m-3.5">All users:</p>

      <section class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <tr class="text-white bg-gray-800">
            {#each Object.entries(usersData[0]).sort(compare) as value}
              {#if value[0] != 'ref'}
                <th class="sticky top-0 z-30 text-sm font-semibold text-white uppercase bg-gray-800">{value[0]}</th>
              {/if}
            {/each}
          </tr>
          {#each usersData as _user}
            <tr class="text-gray-700">
              {#each Object.entries(_user).sort(compare) as value}
                {#if value[0] != 'ref'}
                  <td class="px-4 py-3 text-left">{value[1]}</td>
                {/if}
              {/each}
            </tr>
          {/each}
        </table>
      </section>
    </main>
  </Doc>
</Collection>
