import axios from "axios";
import { Publisher } from "../models/Publisher";

export class PublisherAPI {
  static async getPublishers() {
    const request = await axios.get<Publisher[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/publishers`
    );
    return request.data;
  }
}
