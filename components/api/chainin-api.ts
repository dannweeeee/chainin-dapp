import { list } from "postcss";

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
  //////////////////////////////
  /////////// USER /////////////
  //////////////////////////////

  // create new user
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

  // fetch all users
  fetchAllUsers: async () => {
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

  // fetch user by wallet address
  fetchUserByWalletAddress: async (wallet_address: string | undefined) => {
    const url = `${API_BASE_URL}/v1/user/${wallet_address}`;
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };

    const response = await fetch(url, options);
    console.log(response);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  // update user by wallet address
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

  // delete user by wallet address
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

  //////////////////////////////////////
  //////////// ORGANISATION ////////////
  //////////////////////////////////////

  // create new organisation
  createOrganisation: async (
    organisation_name: string,
    organisation_symbol: string,
    organisation_type: number,
    description: string,
    picture_url: string,
    website_url: string,
    creator_wallet_address: string | undefined,
    nft_contract_address: string
  ) => {
    const url = `${API_BASE_URL}/v1/organisation`;
    const options = {
      method: ApiMethods.POST,
      headers: HEADERS,
      body: JSON.stringify({
        organisation_name,
        organisation_symbol,
        organisation_type,
        description,
        picture_url,
        website_url,
        creator_wallet_address,
        nft_contract_address,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  // fetch all organisations
  fetchAllOrganisations: async () => {
    const url = `${API_BASE_URL}/v1/organisation`;
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

  // fetch organisation by organisation id
  fetchOrganisationByOrganisationId: async (organisation_id: number) => {
    const url = `${API_BASE_URL}/v1/organisation/id/${organisation_id}`;
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

  // fetch organisation by organisation name
  fetchOrganisationByOrganisationName: async (organisation_name: string) => {
    const url = `${API_BASE_URL}/v1/organisation/name/${organisation_name}`;
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

  // fetch organisation by organisation symbol
  fetchOrganisationByOrganisationSymbol: async (
    organisation_symbol: string
  ) => {
    const url = `${API_BASE_URL}/v1/organisation/symbol/${organisation_symbol}`;
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

  // update organisation by organisation id
  updateOrganisationByOrganisationId: async (
    organisation_id: number,
    organisation_name: string,
    organisation_symbol: string,
    organisation_type: number,
    description: string,
    picture_url: string,
    website_url: string,
    creator_wallet_address: string,
    nft_contract_address: string
  ) => {
    const url = `${API_BASE_URL}/v1/organisation/${organisation_id}`;
    const options = {
      method: ApiMethods.PUT,
      headers: HEADERS,
      body: JSON.stringify({
        organisation_name,
        organisation_symbol,
        organisation_type,
        description,
        picture_url,
        website_url,
        creator_wallet_address,
        nft_contract_address,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  // delete organisation by organisation id
  deleteOrganisationByOrganisationId: async (organisation_id: number) => {
    const url = `${API_BASE_URL}/v1/organisation/${organisation_id}`;
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

  //////////////////////////////////////
  //////////// JOB LISTING /////////////
  //////////////////////////////////////

  // create new job listing
  createListing: async (
    organisation_id: number,
    listing_title: string,
    employment_status: string,
    location: string,
    description: string
  ) => {
    const url = `${API_BASE_URL}/v1/listing`;
    const options = {
      method: ApiMethods.POST,
      headers: HEADERS,
      body: JSON.stringify({
        organisation_id,
        listing_title,
        employment_status,
        location,
        description,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  // fetch all job listings
  fetchAllListings: async () => {
    const url = `${API_BASE_URL}/v1/listing`;
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

  // fetch job listing by listing id
  fetchListingsByListingId: async (listing_id: number) => {
    const url = `${API_BASE_URL}/v1/listing/id/${listing_id}`;
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

  // fetch job listing by listing title
  fetchListingByListingTitle: async (listing_title: string) => {
    const url = `${API_BASE_URL}/v1/listing/title/${listing_title}`;
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

  // fetch job listing by organisation id
  fetchListingByOrganisationId: async (organisation_id: number) => {
    const url = `${API_BASE_URL}/v1/listing/organisation/${organisation_id}`;
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

  // update job listing by listing id
  updateListingByListingId: async (
    listing_id: number,
    organisation_id: number,
    listing_title: string,
    employment_status: string,
    location: string,
    description: string
  ) => {
    const url = `${API_BASE_URL}/v1/listing/${listing_id}`;
    const options = {
      method: ApiMethods.PUT,
      headers: HEADERS,
      body: JSON.stringify({
        organisation_id,
        listing_title,
        employment_status,
        location,
        description,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

  // delete job listing by listing id
  deleteListingByListingId: async (listing_id: number) => {
    const url = `${API_BASE_URL}/v1/listing/${listing_id}`;
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
<<<<<<< HEAD
  ////////////////////////////
  //////// Application ///////
  ////////////////////////////
  newApplication: async (
=======

  //////////////////////////////////////
  ////////// JOB APPLICATION ///////////
  //////////////////////////////////////

  // create new job application
  createApplication: async (
>>>>>>> main
    subgraph_id: string,
    applicant_wallet_address: string,
    listing_id: number,
    profile_url: string
  ) => {
    const url = `${API_BASE_URL}/v1/application`;
    const options = {
      method: ApiMethods.POST,
      headers: HEADERS,
      body: JSON.stringify({
        subgraph_id,
        applicant_wallet_address,
        listing_id,
        profile_url,
      }),
    };
<<<<<<< HEAD
=======

>>>>>>> main
    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

<<<<<<< HEAD
  fetchAllApplication: async () => {
=======
  // fetch all job applications
  fetchAllApplicants: async () => {
>>>>>>> main
    const url = `${API_BASE_URL}/v1/application`;
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

<<<<<<< HEAD
  fetchApplicationBySubgraphID: async (subgraph_id: string) => {
=======
  // fetch job application by subgraph id
  fetchApplicationBySubgraphId: async (subgraph_id: string) => {
>>>>>>> main
    const url = `${API_BASE_URL}/v1/application/subgraph/${subgraph_id}`;
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };
<<<<<<< HEAD
=======

>>>>>>> main
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

<<<<<<< HEAD
  fetchApplicationByWallet: async (wallet: string) => {
    const url = `${API_BASE_URL}/v1/application/user/${wallet}`;
=======
  // fetch job application by applicant wallet address
  fetchApplicationByWalletAddress: async (applicant_wallet_address: string) => {
    const url = `${API_BASE_URL}/v1/application/user/${applicant_wallet_address}`;
>>>>>>> main
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };
<<<<<<< HEAD
=======

>>>>>>> main
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

<<<<<<< HEAD
  fetchApplicationByListingID: async (listing_id: number) => {
    const url = `${API_BASE_URL}/v1/applicant/listing/${listing_id}`;
=======
  // fetch job application by listing id
  fetchApplicationByListingId: async (listing_id: number) => {
    const url = `${API_BASE_URL}/v1/application/listing/${listing_id}`;
>>>>>>> main
    const options = {
      method: ApiMethods.GET,
      headers: HEADERS,
    };
<<<<<<< HEAD
=======

>>>>>>> main
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },
<<<<<<< HEAD
  UpdateApplicationBySubgraphID: async (
=======

  // update job application by subgraph id
  updateApplicationBySubgraphId: async (
>>>>>>> main
    subgraph_id: string,
    applicant_wallet_address: string,
    listing_id: number,
    profile_url: string
  ) => {
    const url = `${API_BASE_URL}/v1/application/${subgraph_id}`;
    const options = {
      method: ApiMethods.PUT,
      headers: HEADERS,
      body: JSON.stringify({
<<<<<<< HEAD
        application_wallet_address: applicant_wallet_address,
        listing_id: listing_id,
        profile_url: profile_url,
      }),
    };
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
=======
        applicant_wallet_address,
        listing_id,
        profile_url,
      }),
    };

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
>>>>>>> main
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },

<<<<<<< HEAD
  DeleteApplicationBySubgraphID: async (subgraph_id: string) => {
=======
  // delete job application by subgraph id
  deleteApplicationBySubgraphId: async (subgraph_id: string) => {
>>>>>>> main
    const url = `${API_BASE_URL}/v1/application/${subgraph_id}`;
    const options = {
      method: ApiMethods.DELETE,
      headers: HEADERS,
    };
<<<<<<< HEAD
    const response = await fetch(url, options);
    if (response.status === 200) {
      const data = await response.json();
      return data;
=======

    const response = await fetch(url, options);

    if (response.status === 200) {
      return response.json();
>>>>>>> main
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  },
};

export default ChainInApi;
