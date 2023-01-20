import { EventEmitter } from "fbemitter";

const SERVER = "http://localhost:8080";

class UserStore {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getUsers() {
    try {
      const response = await fetch(`${SERVER}/users`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_USERS_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_USERS_ERROR");
    }
  }

  async addUser(user) {
    try {
      const response = await fetch(`${SERVER}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw response;
      }
      this.getUsers();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_USERS_ERROR");
    }
  }

  async checkExistingUser(user) {
    try {
      const response = await fetch(`${SERVER}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      return response.ok;
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_USERS_ERROR");
    }
  }

  async updateUser(id, user) {
    try {
      const response = await fetch(`${SERVER}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw response;
      }
      this.getUsers();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_USERS_ERROR");
    }
  }

  async deleteUser(id) {
    try {
      const response = await fetch(`${SERVER}/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw response;
      }
      this.getUsers();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("DELETE_USERS_ERROR");
    }
  }
}

const store = new UserStore();

export default store;
