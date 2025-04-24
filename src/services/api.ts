import axios from "axios";

const API_URL = "https://labimerie-strapi.onrender.com";

const API_TOKEN =
  "2589822e8880ba3859957d7cc33ef20fc4d0e72e1c20c7aea9e6df00a083a17e7a74a83ed6398ad1634349e02c5bb74fcf5a9fc5381e664a4767271234a1a1216c4f1130b098332b8c87b4b9e714c2a10ef3f83bf86e26d40136451992c1306f801e267db7bbd187f45dbaefdcf6c8dd6a4f9fe158c408c8dcbc47f0e8bd1733";

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
