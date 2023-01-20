import { EventEmitter } from "fbemitter";

const SERVER = "http://localhost:8080";

class RouteStore {
  constructor() {
    this.data = [];
    this.emitter = new EventEmitter();
  }

  async getRoutes() {
    try {
      const response = await fetch(`${SERVER}/routes`);
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      this.emitter.emit("GET_ROUTES_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("GET_ROUTES_ERROR");
    }
  }

  async addRoute(route) {
    try {
      const response = await fetch(`${SERVER}/routes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      });
      if (!response.ok) {
        throw response;
      }
      this.getRoutes();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("ADD_ROUTES_ERROR");
    }
  }

  async updateRoute(id, route) {
    try {
      const response = await fetch(`${SERVER}/routes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      });
      if (!response.ok) {
        throw response;
      }
      this.getRoutes();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("UPDATE_ROUTES_ERROR");
    }
  }

  async deleteRoute(id) {
    try {
      const response = await fetch(`${SERVER}/routes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw response;
      }
      this.getRoutes();
    } catch (err) {
      console.warn(err);
      this.emitter.emit("DELETE_ROUTES_ERROR");
    }
  }
}

const store = new RouteStore();

export default store;
