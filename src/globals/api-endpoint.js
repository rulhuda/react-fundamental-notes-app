import CONFIG from "./config";

const API_ENDPOINT = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  ME: `${CONFIG.BASE_URL}/users/me`,
  NOTES: `${CONFIG.BASE_URL}/notes`,
  NOTES_ARCHIVED: `${CONFIG.BASE_URL}/notes/archived`,
  SINGLE_NOTE: (id) => `${CONFIG.BASE_URL}/notes/${id}`,
  ACTION_ARCHIVE: (id) => `${CONFIG.BASE_URL}/notes/${id}/archive`,
  ACTION_UNARCHIVE: (id) => `${CONFIG.BASE_URL}/notes/${id}/unarchive`,
  DELETE_NOTE: (id) => `${CONFIG.BASE_URL}/notes/${id}`,
};

export default API_ENDPOINT;
