import { getArtist } from "@/api/artists";
import { getVenue } from "@/api/venues";

export async function getProfile(token, isVenue) {
  try {
    let data = null;
    if (isVenue) {
      data = await getVenue(token);
    } else {
      data = await getArtist(token);
    }
    return data;
  } catch (error) {
    console.error("Error linking backend for venue: ", error.message);
  }
}
