import { Fourniture } from "../../@types/interfaces/fourniture.interface";
import { Outils } from "../../@types/interfaces/outils.interface";
import {  Personnel } from "../../@types/interfaces/personnel.interface";
import url from "../url";
import Cookies from "js-cookie";


const token = Cookies.get("token");

export const fournitures = {
    getAll: async () => {
        try {
            const response = await fetch(`${url.current}/fournitures`, {
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
            console.error("Failed to fetch fournitures:", error);
            throw error;
        }
    },

    getOne: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/fournitures/${id}`, {
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
            console.error("Failed to fetch fourniture:", error);
            throw error;
        }
    },

    create: async (fourniture: Fourniture) => {
        try {
            const response = await fetch(`${url.current}/fournitures`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fourniture),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create fourniture:", error);
            throw error;
        }
    },

    update: async (id: string, fourniture: Fourniture) => {
        try {
            const response = await fetch(`${url.current}/fournitures/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(fourniture),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to update fourniture:", error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/fournitures/${id}`, {
                method: "DELETE",
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
            console.error("Failed to delete fourniture:", error);
            throw error;
        }
    },
};

export const outils = {
    getAll: async () => {
        try {
            const response = await fetch(`${url.current}/outils`, {
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
            console.error("Failed to fetch outils:", error);
            throw error;
        }
    },

    getOne: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/outils/${id}`, {
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
            console.error("Failed to fetch fourniture:", error);
            throw error;
        }
    },

    create: async (outils: Outils) => {
        try {
            const response = await fetch(`${url.current}/outils`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(outils),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create outils:", error);
            throw error;
        }
    },

    update: async (id: string, outils: Outils) => {
        try {
            const response = await fetch(`${url.current}/outils/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(outils),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to update outils:", error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/outils/${id}`, {
                method: "DELETE",
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
            console.error("Failed to delete outils:", error);
            throw error;
        }
    },
};

export const personnels = {
    getAll: async () => {
        try {
            const response = await fetch(`${url.current}/personnels`, {
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
            console.error("Failed to fetch outils:", error);
            throw error;
        }
    },

    getOne: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/personnels/${id}`, {
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
            console.error("Failed to fetch personnels:", error);
            throw error;
        }
    },

    create: async (personnel: Personnel) => {
        try {
            const response = await fetch(`${url.current}/personnels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(personnel),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to create personnels:", error);
            throw error;
        }
    },

    update: async (id: string, personnel: Personnel) => {
        try {
            const response = await fetch(`${url.current}/personnels/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(personnel),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to update fourniture:", error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await fetch(`${url.current}/outils/${id}`, {
                method: "DELETE",
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
            console.error("Failed to delete outils:", error);
            throw error;
        }
    },
};