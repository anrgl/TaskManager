import routes from "routes";
import FetchHelper from "utils/fetchHelper";

export default {
  async index(params) {
    const path = routes.apiV1TasksPath();
    return FetchHelper.get(path, params);
  },

  async show(id) {
    const path = routes.apiV1TaskPath(id);
    return FetchHelper.get(path);
  },

  async update(id, task = {}) {
    const path = routes.apiV1TaskPath(id);
    return FetchHelper.put(path, task);
  },

  async create(task = {}) {
    const path = routes.apiV1TasksPath();
    return FetchHelper.post(path, task);
  },

  async destroy(id) {
    const path = routes.apiV1TaskPath(id);
    return FetchHelper.delete(path);
  },
};
