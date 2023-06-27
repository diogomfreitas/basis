import http from "../http-common";

class ServantDataService {
  getAll() {
    return http.get("/servants");
  }

  get(id) {
    return http.get(`/servants/${id}`);
  }

  create(data) {
    return http.post("/servants", data);
  }

  update(id, data) {
    return http.put(`/servants/${id}`, data);
  }

  delete(id) {
    return http.delete(`/servants/${id}`);
  }

  findByName(name) {
    return http.get(`/servants?name=${name}`);
  }
}

export default new ServantDataService();
