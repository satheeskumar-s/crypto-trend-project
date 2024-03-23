import axios, { AxiosResponse, HttpStatusCode } from 'axios';
import { showErrorNotification } from '../helper/Messages';

export function registerInterceptors() {
  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.status === HttpStatusCode.TooManyRequests
      ) {
        showErrorNotification(
          'There are too many request error from the server'
        );
      }

      return Promise.reject(error);
    }
  );
}
