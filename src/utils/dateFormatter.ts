import moment from 'moment';

export const formatDate = (date: Date, format?: string) => {
  if (format) {
    return moment(date).format(format);
  }

  return moment(date).format('DD-MMM-YYYY, hh:mm a');
};
