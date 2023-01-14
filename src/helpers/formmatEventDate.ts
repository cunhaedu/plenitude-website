import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

function customFormat(dateString: string) {
  const date = new Date(dateString);
  return format(date, 'dd MMM yyy', { locale: ptBR });
}

export function formatEventDate(initialDate: string, endDate: string): string {
  const formattedInitialDate = customFormat(initialDate).toUpperCase();
  const formattedEndDate = customFormat(endDate).toUpperCase();

  return `${formattedInitialDate} - ${formattedEndDate}`;
}
