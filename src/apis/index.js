import CONFIG from '../config';
import RestApi from './rest';

const { SETTINGS, API_ENDPOINTS } = CONFIG;

const Api = {
  addEncryptParams(params = {}) {
    const localParams = params;
    if (SETTINGS.ENCRYPT) {
      localParams.encrypt = true;
    }
    return params;
  },

  async getRestaurants() {
    const url = `${API_ENDPOINTS.MAIN}/restaurants`;

    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.json();
        
        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async getRestaurant(slug) {
    const url = `${API_ENDPOINTS.MAIN}/restaurant/${slug}`;

    try {
      const res = await RestApi.get(url);
      if (res.status === 200) {
        const data = await res.json();

        return data;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default Api;