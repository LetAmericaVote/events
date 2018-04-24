export default function processUser(user) {
  const isFlagged = !!user.flag;

  const isFlagFilled = isFlagged &&
    typeof user.flag === 'object';

  const flagId = isFlagged ? (
    isFlagFilled ? user.flag.id : user.flag
  ) : null;

  const processedUser = {
    ...user,
  };

  if (flagId) {
    processedUser.flag = flagId;
  }

  const processedData = {
    user: processedUser,
  };

  if (isFlagFilled) {
    processedData.flag = user.flag;
  }

  return processedData;
}
