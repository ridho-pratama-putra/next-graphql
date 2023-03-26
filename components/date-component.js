import { parseISO, format } from 'date-fns';

export default function DateComponent({ dateString }) {
    const date = parseISO(dateString);
    return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd HH:mm:ss')}</time>;
}