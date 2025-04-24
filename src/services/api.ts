import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "";
const API_TOKEN = import.meta.env.VITE_API_TOKEN || "";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 10000,
});

export const getStrapiMediaUrl = (imageUrl: string): string | undefined => {
  if (!imageUrl) return undefined;
  return imageUrl.startsWith("/") ? `${API_URL}${imageUrl}` : imageUrl;
};

export const getProjects = async () => {
  try {
    const response = await apiClient.get("/api/projects?populate=*");
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Erreur d'authentification: Token API invalide");
    }
    return [];
  }
};

export const getServices = async () => {
  try {
    const response = await apiClient.get("/api/services?populate=*");
    return response.data.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des services:", error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      console.error("Erreur d'authentification: Token API invalide");
    }
    return [];
  }
};
