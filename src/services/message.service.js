import { writable } from "svelte/store";
import { callExternalApi } from "./external-api.service";
import { useAuth0 } from "./auth0";

let { getAccessToken } = useAuth0;

const apiServerUrl = import.meta.env.VITE_API_SERVER_URL;

export const message = writable("");

export const getPublicResource = async () => {
  const config = {
    url: `${apiServerUrl}/api/messages/public`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalApi({ config });

  if (data) {
    message.set(JSON.stringify(data, null, 2));
  }

  if (error) {
    message.set(JSON.stringify(error, null, 2));
  }
};

export const getProtectedResource = async () => {
  const accessToken = await getAccessToken();
  const config = {
    url: `${apiServerUrl}/api/messages/protected`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  };

  const { data, error } = await callExternalApi({ config });

  if (data) {
    message.set(JSON.stringify(data, null, 2));
  }

  if (error) {
    message.set(JSON.stringify(error, null, 2));
  }
};

export const getAdminResource = async () => {
  const accessToken = await getAccessToken();
  const config = {
    url: `${apiServerUrl}/api/messages/admin`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  };

  const { data, error } = await callExternalApi({ config });

  if (data) {
    message.set(JSON.stringify(data, null, 2));
  }

  if (error) {
    message.set(JSON.stringify(error, null, 2));
  }
};
