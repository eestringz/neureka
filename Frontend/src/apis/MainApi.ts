import { publicRequest } from "@src/hooks/requestMethod";
import { Category } from "@src/types/MainType";

export const fetchKeywords = async (categories: Category[]) => {
  const queryString = categories.map(category => `keywords=${category.name}`).join('&');
  return await publicRequest.get(`keyword?${queryString}`);
}

export const fetchKeywordNews = async (ids: string[]) => {
  return await publicRequest.post('news/keyword', {"ids":ids})
};