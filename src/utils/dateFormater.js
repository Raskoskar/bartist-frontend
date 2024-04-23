export default function formatDate(date) {
  const Newdate = new Date(date);
  const formattedDate = Newdate.toLocaleDateString("fr-FR", {
    day: "2-digit", // numeric, 2-digit
    month: "long", // numeric, 2-digit, long, short, narrow
    year: "numeric", // numeric, 2-digit
  });

  const parts = formattedDate.split(" ");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return {day: day,month: month, year: year};
}
