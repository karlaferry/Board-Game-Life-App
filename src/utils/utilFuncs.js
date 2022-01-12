export const capitaliseString = (str) => {
  return str
    .split("-")
    .map((a) => a[0].toUpperCase() + a.substring(1).toLowerCase())
    .join(" ");
};

export const sortTitle = (a, b) => {
  const titleA = a.title.toUpperCase();
  const titleB = b.title.toUpperCase();

  let comparison = 0;
  if (titleA > titleB) {
    comparison = 1;
  } else if (titleA < titleB) {
    comparison = -1;
  }
  return comparison;
};
export const sortVotes = (a, b) => {
  const votesA = a.votes.toUpperCase();
  const votesB = b.votes.toUpperCase();

  let comparison = 0;
  if (votesA > votesB) {
    comparison = 1;
  } else if (votesA < votesB) {
    comparison = -1;
  }
  return comparison;
};
export const sortComments = (a, b) => {
  const commentsA = a.comment_count.toUpperCase();
  const commentsB = b.comment_count.toUpperCase();

  let comparison = 0;
  if (commentsA > commentsB) {
    comparison = 1;
  } else if (commentsA < commentsB) {
    comparison = -1;
  }
  return comparison;
};
