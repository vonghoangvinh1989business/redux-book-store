import api from "../../apiService";

export const fetchBookData = async ({ pageNum, limit, query }) => {
  try {
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw new Error("No Book Data Found.");
  }
};
