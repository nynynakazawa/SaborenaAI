type Birthday = {
  year: number;
  month: number;
  date: number;
};

export const getAge = (birthday: Birthday) => {
  const today = new Date();
  const birthDate = new Date(birthday.year, birthday.month - 1, birthday.date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};
