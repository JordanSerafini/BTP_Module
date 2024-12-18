import { Chantier } from "../../@types/interfaces/chantier.interface";
import url from "../url";
import Cookies from "js-cookie";


const token = Cookies.get("token");

export const chantier = {
  getAll: async () => {
    try {
      const response = await fetch(`${url.current}/chantiers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch chantiers:", error);
      throw error; 
    }
  },

  getOne: async (id: string) => {
    try {
      const response = await fetch(`${url.current}/chantiers/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch chantier:", error);
      throw error;
    }
  },

  create: async (chantier: Chantier) => {
    try {
      const response = await fetch(`${url.current}/chantiers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chantier),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to create chantier:", error);
      throw error;
    }
  },

  update: async (id: string, chantier: Chantier) => {
    try {
      const response = await fetch(`${url.current}/chantiers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(chantier),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.error("Failed to update chantier:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await fetch(`${url.current}/chantiers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Failed to delete chantier:", error);
      throw error;
    }
  },
};
