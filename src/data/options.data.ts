export const yearOptions = [
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030"
]



export const getYearOptions = () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const yearOptions: string[] = [];
  for (let i = 0; i <= 100; i++) {
    yearOptions.push((currentYear - i).toString())
  }

  return yearOptions;
}