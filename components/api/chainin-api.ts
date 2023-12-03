const API_BASE_URL = "https://chain-server-api.onrender.com";
const HEADERS = {
  "Content-Type": "application/json",
};

const ApiMethods = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

const ChainInApi = {
  createUser: async (
    wallet_address: string | undefined,
    first_name: string,
    last_name: string,
    email_address: string,
    biography: string
  ) => {
    const url = `${API_BASE_URL}/v1/user`;
    const options = {
      method: ApiMethods.POST,
      headers: HEADERS,
      body: JSON.stringify({
        wallet_address,
        first_name,
        last_name,
        email_address,
        biography,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  fetchUsers: async () => {
    const url = `${API_BASE_URL}/v1/user`;
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  fetchUserByWalletAddress: async (wallet_address: string) => {
    const url = `${API_BASE_URL}/v1/user/${wallet_address}`;
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };

    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return {
        wallet_address,
        first_name: data.first_name,
        last_name: data.last_name,
        email_address: data.email_address,
        biography: data.biography,
      };
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  updateUserByWalletAddress: async (
    wallet_address: string,
    first_name: string,
    last_name: string,
    email_address: string,
    biography: string
  ) => {
    const url = `${API_BASE_URL}/v1/user/${wallet_address}`;
    const options = {
      method: ApiMethods.PUT,
      headers: HEADERS,
      body: JSON.stringify({
        wallet_address,
        first_name,
        last_name,
        email_address,
        biography,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  deleteUserByWalletAddress: async (wallet_address: string) => {
    const url = `${API_BASE_URL}/v1/user/${wallet_address}`;
    const options = {
      method: ApiMethods.DELETE,
      headers: HEADERS,
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },
};

export default ChainInApi;
