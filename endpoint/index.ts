/**
 * API endpoint
 */

interface PostApi {
  list(requestData: object, axios: any): object[]
  detail(requestData: object, axios: any): object[]
}

class Post implements PostApi {
  /**
   * Get posts list
   * @param requestData object of request data
   */
  list(requestData: object, axios: any) {
    return axios
      .get('/posts', requestData)
      .then((data: object) => data)
      .catch(() => ({ status: 'error' }))
  }
  /**
   * Get posts detail
   * @param requestData object of request data
   */
  detail(requestData: object, axios: any) {
    return axios
      .get('/posts', requestData)
      .then((data: object) => data)
      .catch(() => ({ status: 'error' }))
  }
}

// export { Post }
export { Post }
