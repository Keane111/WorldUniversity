import axios from 'axios';
import type { Country } from "@/types/country";

const BASE_URL = 'https://restcountries.com/v3.1';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export const countryApi = {
  getAllCountries: async (): Promise<Country[]> => {
    try {
      const response = await api.get('/all?fields=name,capital,region,subregion,population,area,flags,cca3,cca2,languages,currencies,independent');
      return response.data;
    } catch (error: any) {
      console.error('Error fetching countries:', error);
      
      if (error.response?.status === 400) {
        try {
          const response = await api.get('/all');
          return response.data;
        } catch (fallbackError) {
          console.error('Fallback API also failed:', fallbackError);
          throw new Error('Unable to fetch countries from API');
        }
      }
      
      throw error;
    }
  },

  getCountryByName: async (name: string): Promise<Country[]> => {
    try {
      const response = await api.get(`/name/${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching country by name:', error);
      return [];
    }
  },

  getCountriesByRegion: async (region: string): Promise<Country[]> => {
    try {
      const response = await api.get(`/region/${encodeURIComponent(region)}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries by region:', error);
      return [];
    }
  },

  getIndependentCountries: async (status: boolean): Promise<Country[]> => {
    try {
      const response = await api.get(`/independent?status=${status}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching independent countries:', error);
      return [];
    }
  },

  getCountriesByLanguage: async (language: string): Promise<Country[]> => {
    try {
      const allCountries = await countryApi.getAllCountries();
      return allCountries.filter((country: Country) => 
        country.languages && 
        Object.values(country.languages).some(lang => 
          lang.toLowerCase().includes(language.toLowerCase())
        )
      );
    } catch (error) {
      console.error('Error fetching countries by language:', error);
      return [];
    }
  },
};