export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatDateSince = (isoDate: string): string => {
  const data = {
    formattedDate: isoDate,
  };
  const { formattedDate } = data;
  const dateObject: any = new Date(formattedDate);
  const newDate: any = new Date();
  const seconds = Math.floor((newDate - dateObject) / 1000);
  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
};

export const getForumNameFromUrl = (location: any): string => {
  const path = location.pathname;
  const pathSplit = path.split("/");
  const forumNameFromURL = pathSplit[2];
  return forumNameFromURL;
};
