export default function processFlag(flag) {
  const hasTarget = !!flag.target;
  const hasJudge = !!flag.judge;

  const isTargetFilled = hasTarget &&
    typeof flag.target === 'object';

  const isJudgeFilled = hasJudge &&
    typeof flag.judge === 'object';

  const targetId = hasTarget ? (
    isTargetFilled ? flag.target.id : flag.target
  ) : null;

  const judgeId = hasTarget ? (
    isJudgeFilled ? flag.judge.id : flag.judge
  ) : null;

  const processedFlag = {
    ...flag,
  };

  if (targetId) {
    processedFlag.target = targetId;
  }

  if (judgeId) {
    processedFlag.judge = judgeId;
  }

  const processedData = {
    flag: processedFlag,
    users: [],
  };

  if (isJudgeFilled) {
    processedData.users.push(flag.judge);
  }

  if (isTargetFilled && flag.targetType) {
    if (flag.targetType === 'user') {
      processedData.users.push(flag.target);
    } else {
      processedData[flag.targetType] = flag.target;
    }
  }

  return processedData;
}
