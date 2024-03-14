export default class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }

  isValidCredentials() {
    const users = [
      {email: 'user@example.com', password: 'password'},
      {email: 'user1@example.com', password: 'password1'}
    ];

    for (const user in users){
      return this.username == user.email && this.password == user.password
      }
    }
  }