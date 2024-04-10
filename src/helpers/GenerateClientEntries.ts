function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // Максимум и минимум включаются
}

// Функция для генерации случайной комбинации имени и фамилии
function getRandomName(): string {
  const names = ["John", "Jane", "Michael", "Emily", "William", "Jessica", "David", "Sarah", "Daniel", "Olivia"];
  const randomNameIndex = getRandomInt(0, names.length - 1);

  const randomFirstName = names[randomNameIndex];

  return randomFirstName;
}

function getRandomLastName(): string {
  const lastNames = ["Doe", "Smith", "Williams", "Brown", "Taylor", "Wilson", "Johnson", "Miller", "Jones", "Davis"];
  const randomLastNameIndex = getRandomInt(0, lastNames.length - 1);

  const randomLastName = lastNames[randomLastNameIndex];

  return randomLastName;
}

function generateRandomPhoneNumber() {
  const part1 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // Генерируем случайные три цифры (от 000 до 999)
  const part2 = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0"); // Генерируем случайные три цифры (от 000 до 999)
  const part3 = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // Генерируем случайные четыре цифры (от 0000 до 9999)
  return `${part1}-${part2}-${part3}`;
}
export {getRandomName, getRandomLastName, generateRandomPhoneNumber}
