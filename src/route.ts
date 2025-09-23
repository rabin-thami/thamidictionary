/**
 * An array of routs that are accessible to the public
 * These routes do not required authentication
 * @type {string[]}
 */
export const publicRoute = ["/", "/auth/"];

/**
 * An array of routs that are use for authentication
 * These routes will redirect logged-in users to settings
 * @type {string[]}
 */
export const authRoute = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/error",
  "/auth/new-password",
];

/**
 * The prefix for API authentication route.
 * Route that starts with this prefix is used for aou authentication
 * @type {string[]}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after logging in

 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";
