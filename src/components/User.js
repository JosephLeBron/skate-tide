export default class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  isValidCredentials() {
    return this.username === 'user' && this.password == 'password'
  }
}
