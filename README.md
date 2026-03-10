# This git

> https://github.com/samedandev/2603_Laravel9_vuejs

# Backend Source

> https://github.com/vueschool/laravel-course-backend

# Frontend Source

> https://github.com/vueschool/laravel-backends-for-vuejs-3
> https://github.com/vueschool/laravel-backends-for-vuejs-3/blob/solutions/plugins/axiosPlugin.ts

## Install Laravel Sanctum

> https://laravel.com/docs/10.x/sanctum

## Install Laravel Fortify = create SPA routes

> https://laravel.com/docs/10.x/fortify

# Added /api to auth routes

> /config/fortify.php -> 'prefix' => 'api', 'views' => false,

```
 POST      forgot-password ............................... password.email › Laravel\Fortify › PasswordResetLinkController@store
  GET|HEAD  login .............................................. login › Laravel\Fortify › AuthenticatedSessionController@create
  POST      login ......................................... login.store › Laravel\Fortify › AuthenticatedSessionController@store
  POST      logout ........................................... logout › Laravel\Fortify › AuthenticatedSessionController@destroy
  GET|HEAD  register .............................................. register › Laravel\Fortify › RegisteredUserController@create
  POST      register ......................................... register.store › Laravel\Fortify › RegisteredUserController@store
  POST      reset-password ..................................... password.update › Laravel\Fortify › NewPasswordController@store
  GET|HEAD  reset-password/{token} ............................. password.reset › Laravel\Fortify › NewPasswordController@create
  GET|HEAD  sanctum/csrf-cookie .............................. sanctum.csrf-cookie › Laravel\Sanctum › CsrfCookieController@show
  GET|HEAD  two-factor-challenge ........... two-factor.login › Laravel\Fortify › TwoFactorAuthenticatedSessionController@create
  POST      two-factor-challenge ...... two-factor.login.store › Laravel\Fortify › TwoFactorAuthenticatedSessionController@store
  GET|HEAD  user/confirm-password ...................... password.confirm › Laravel\Fortify › ConfirmablePasswordController@show
  POST      user/confirm-password ............... password.confirm.store › Laravel\Fortify › ConfirmablePasswordController@store
  GET|HEAD  user/confirmed-password-status .... password.confirmation › Laravel\Fortify › ConfirmedPasswordStatusController@show
  POST      user/confirmed-two-factor-authentication two-factor.confirm › Laravel\Fortify › ConfirmedTwoFactorAuthenticationCon…
  PUT       user/password ................................... user-password.update › Laravel\Fortify › PasswordController@update
  PUT       user/profile-information ... user-profile-information.update › Laravel\Fortify › ProfileInformationController@update
  POST      user/two-factor-authentication ....... two-factor.enable › Laravel\Fortify › TwoFactorAuthenticationController@store
  DELETE    user/two-factor-authentication .... two-factor.disable › Laravel\Fortify › TwoFactorAuthenticationController@destroy
  GET|HEAD  user/two-factor-qr-code ...................... two-factor.qr-code › Laravel\Fortify › TwoFactorQrCodeController@show
  GET|HEAD  user/two-factor-recovery-codes .......... two-factor.recovery-codes › Laravel\Fortify › RecoveryCodeController@index
  POST      user/two-factor-recovery-codes two-factor.regenerate-recovery-codes › Laravel\Fortify › RecoveryCodeController@store
  GET|HEAD  user/two-factor-secret-key ...
```

> RedirectIfAuthenticated.php ->

```
if($request->expectsJson()) {
                    return response()->json([],200);
                }
```

## Create Vue Plugin for Axios

> npx nuxi add plugin axiosPlugin

# Created Middleware

> frontend/middleware/auth.ts
> frontend/middleware/guest.ts

# Added

> /config/app.php -> App\Providers\FortifyServiceProvider::class,

## Redirecting after login

> ![redirecting](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen01.jpg)

## Composables Nuxt & Initiate User

> /frontend/composables/useAuth.ts

```
async function initUser() {
        user.value = await getUser();
    }
```

## Interceptors : Protect route after Cookie expire on Backend

> /frontend/plugins/axiosPlugin

```axios.interceptors.response.use(
        (res) => res, // on success, do nothing
        (error) => {
            // on error
            if ([401, 419].includes(error.response.status)) {
                const { logout } = useAuth();
                logout();
            } else {
                return Promise.reject(error);
            }
        },
    );
```

## Backend Resource Controller for CRUD

> /app/Http/Controllers/Links.php
> /routes/api.php

# Laravel Vue Pagination

> https://laravel-vue-pagination.org/

> Frontedn/pages/links/index.vue

> ![Pagination](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen02.jpg)

# Add Queries in URL for pagination

> ![queries](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen03.jpg)

> Frontend/pages/links/index.vue

```
const page = ref(useRoute().query.page || 1);
watch(page, async () => {
    getLinks();
    useRouter().push({ query: { page: page.value } });
});
```

### Search with Laravel Query Builder

> app/Http/Controllers/Links.php

```
function index(Request $request){
        $links = QueryBuilder::for (Link::class)
            ->allowedFilters(['full_link', 'short_link'])
            ->allowedSorts('full_link', 'short_link', 'views', "id")
            ->where("user_id", Auth::user()->id)
            ->paginate($request->get('perPage', 5));
        return response()->json($links);
    }
```

# Frontend search - querie includes 'full_link'

> ![queries](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen04.jpg)
> FRONTEND/pages/links/index.vue

```
const queries = ref({
    page: 1,
    sort: "",
    "filter[full_link]": "",
    ...useRoute().query,
});
<SearchInput v-model="queries['filter[full_link]']" />
```

# Debounce the search to 500ms

> FRONTEND/components/SearchInput.vue

## Sorting - Laravel Query Builder

> https://spatie.be/docs/laravel-query-builder/v6/features/sorting

# Sort by '&sort=-full_link' or '&sort=full_link'

> ![sorting](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen05.jpg)

# Refresh data on frontend

> FRONTEND/pages/links/index.vue -> <button @click="getLinks"><IconRefresh /></button>

## useLinks Composable

> FRONTEND/composable/useLinks.ts

# Transform data from DBB to Vue

> RawLink - data from DBB

# Get data from composable

> FRONTEND/pages/links.index.vue -> const {data, index}= useLinks()

# Use Composable to transform data

> FRONTEND/pages/links.index.vue

```
<td :title="`created ${useTimeAgo(link.created_at).value}`" >
  <a :href="link.full_link" target="_blank">
    {{ link.full_link.replace(/^http(s?):\/\//, "")}}
  </a>
</td>
```

> ![dateTransformed](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen06.jpg)
