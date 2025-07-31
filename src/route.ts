/**
 * An array of route that are accessible to the pubic
 * These routes do not require the authentication
 * @type{string[]}
 */
export const publicRoute = ["/"];

/**
 * An array of route that are accessible use for authentication
 * These routes will redirect  logged in users to /settings
 * @type{string[]}
 */
export const authRoute = ["/login", "/register"];

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
