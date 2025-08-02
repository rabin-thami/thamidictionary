/**
 * An array of route that are accessible to the pubic
 * These routes do not require the authentication
 * @type{string[]}
 */
export const publicRoute = ["/auth/login"];

/**
 * An array of route that are accessible use for authentication
 * These routes will redirect  logged in users to /settings
 * @type{string[]}
 */
export const authRoute = [
  "/auth/login",
  "/auth/register",
  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * These routes start with this prefix are used for API authentication  purpose
 * @type{string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * These default redirect path after  logged in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
