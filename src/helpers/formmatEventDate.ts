import { addDays, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function customFormat(dateString: string) {
  const date = new Date(dateString);
  const fixedDate = addDays(date, 1)
  return format(new Date(fixedDate), 'dd MMM yyy', { locale: ptBR });
}

export function formatEventDate(initialDate: string, endDate: string): string {
  const formattedInitialDate = customFormat(initialDate).toUpperCase();
  const formattedEndDate = customFormat(endDate).toUpperCase();

  return `${formattedInitialDate} - ${formattedEndDate}`;
}
