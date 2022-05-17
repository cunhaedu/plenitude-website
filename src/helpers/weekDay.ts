export function getWeekDayNameFromNumber(number: number): string {
  const weekDaysArray = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado',
  ];

  return weekDaysArray[number];
}
