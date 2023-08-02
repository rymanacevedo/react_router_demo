import { handleCookie } from '../authoring/cookies';

export const [sessionKey, setSessionKey] = handleCookie('session_key', '');
