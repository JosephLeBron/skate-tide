export default class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  isValidCredentials() {
    return this.username === 'user@example.com' && this.password == 'password'
  }
}
