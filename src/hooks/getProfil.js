import { getArtist } from "@/api/artists";
import { getVenueByToken } from "@/api/venues";

export async function getProfile(token, isVenue) {
  try {
    let data = null;
    if (isVenue) {
      data = await getVenueByToken(token);
    } else {
      data = await getArtist(token);
    }
    return data;
  } catch (error) {
    console.error("Error linking backend for venue: ", error.message);
  }
}
