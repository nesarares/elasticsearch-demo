import axios, { AxiosInstance } from "axios";
import { apiKey, keyId } from "../config";

export interface SearchParams {
  search: string;
  starFilter: number;
  sortColumn: string;
  sortDirection: "asc" | "desc";
  resultsPerPage: number;
}

export class ReviewsService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: "/api/reviews",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Authorization: `ApiKey ${btoa(keyId + ":" + apiKey)}`,
      },
    });
  }

  async search({ search, starFilter, sortColumn, sortDirection, resultsPerPage }: SearchParams) {
    let body: any = {
      size: resultsPerPage,
    };

    const conditions: any[] = [];
    const query: any = { bool: { must: conditions } };

    if (sortColumn !== "default") {
      body.sort = [{ [sortColumn]: sortDirection }];
    }

    if (search) {
      conditions.push({
        match: {
          text: search,
        },
      });

      body.highlight = {
        fields: {
          text: { number_of_fragments: 0 },
        },
        pre_tags: ["<mark>"],
        post_tags: ["</mark>"],
      };

      body._source = { exclude: ["text"] };
    }

    if (starFilter) {
      conditions.push({ match: { stars: starFilter } });
    }

    if (conditions.length > 0) {
      body.query = query;
    }

    const response = await this.api.post("_search", body);
    return response?.data?.hits ?? {};
  }
}
