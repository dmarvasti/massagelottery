/* tslint:disable */
import auth0 from "auth0-js";
import * as JWT from 'jwt-decode';
// import * as H from "history";

// import { AUTH_CONFIG } from "./auth0-variables";

export default class Auth {
  public auth0 = new auth0.WebAuth({
    audience: "https://massagelottery.auth0.com/userinfo",   
    clientID: "C21tApWyLxPrDwrcHx86bLKdx1gWW8kg",   
    domain: 'massagelottery.auth0.com',
    redirectUri: `${process.env.REACT_APP_AUTH_REDIRECT_URI}`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  public login() {
    this.auth0.authorize();
  }

  public handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        // H.replace('/home');
        window.location.href='/'
        
      } else if (err) {
        // deal with this later
        // window.location.href='/'       
        // H.replace('/home');
        // console.log(err);
        // alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  public logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    // H.replace('/home');
    window.location.href='/'
  }

  public getUser() {
    if (this.isAuthenticated() && localStorage['id_token']) {
      const {name, email, picture} =  JWT(localStorage.getItem('id_token'));

      return {
        name,
        email,
        picture
      }
    } else {
      return null;
    }
  }

  public isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time

    if (localStorage['expires_at']) {
      const expiresAt = JSON.parse(localStorage.getItem('expires_at') || "{}");
      return new Date().getTime() < expiresAt;
    } else {
      return false;
    }
  }

  private setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    // H.replace('/home');
    window.location.href='/'
  }

}