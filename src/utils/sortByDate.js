export default function sortByDate(arr) {
    arr.sort((a, b) => {
      // Comparaison des points en premier
      if (a.date !== b.date) {
          return b.date - a.date; // Pour un tri décroissant par les points
      }
  });
  return arr;
}