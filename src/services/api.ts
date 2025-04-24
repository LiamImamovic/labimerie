import axios from "axios";

const API_URL = "http://localhost:1337";
const API_TOKEN =
  "de359517dcade716b7c87987d9bb94bc43552e84a3f2eed53aa9ae0d208cff557301eac998dc6551b29e87a6b7cbd12c840f6f302c1e4590ba61a0da709227298ca9e31d1c2693b289abcd092a361f4ba0c78a622670580b80363f7758cff7c87163dbbc5f0e5fc434baca7d4b465150bd79384c3d4c4d50978d1e42844bcced";

export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/projects`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    return [];
  }
};

export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/services?populate=*`, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    return [];
  }
};
