// api.ts
import axios from "axios";

interface Holiday {
  date: string;
  name: string;
  nationalHoliday: boolean;
}

export async function fetchHolidays(
  startDate: string,
  endDate: string
): Promise<Holiday[]> {
  const YOUR_TOKEN = "a90d020f-a7bd-4ecf-9aa2-5068286b234c";
  const url = `https://api.sallinggroup.com/v1/holidays?startDate=${startDate}&endDate=${endDate}`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
    });
    console.log("Fetched holidays:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
}

export { Holiday };
