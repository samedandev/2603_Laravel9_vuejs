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

# Added

> /config/app.php -> App\Providers\FortifyServiceProvider::class,

## Redirecting after login

> ![redirecting](https://github.com/samedandev/2603_Laravel9_vuejs/blob/main/_printscreens/printscreen01.jpg)
