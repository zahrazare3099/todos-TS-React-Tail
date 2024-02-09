import axios from "axios";
import { Reminder } from "../models/reminder";

class ReminderServices {
  http = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  async getReminders() {
    const { data } = await this.http.get<Reminder[]>("/todos");
    return data;
  }
  async addReminders(title: string) {
    await this.http.post("/todos", { title });
  }
  async deleteReminders(id: number) {
    await this.http.delete<Reminder[]>("/todos" + id);
  }
}

export default new ReminderServices();
