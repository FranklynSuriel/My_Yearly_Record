import decode from 'jwt-decode';

class AuthService {
  // decode token for authentication
  getProfile() {
    return decode(this.getToken());
  }

  // When User login, 
  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  // retrieves the token from the local storage by using the key 'id_token' and returns it.
  getToken() {
    return localStorage.getItem('id_token');
  }
  // store the token in localStore when the user login and redirect to landing "/"
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }
  // remove the token from localStore and redirect to landing when the user logout
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
