export const formatBirthDate = (inputDate) => {
  const options = { day: "numeric", month: "short", year: "numeric" };
  const formattedDate = new Date(inputDate).toLocaleDateString(
    "en-IN",
    options
  );
  return formattedDate;
};
