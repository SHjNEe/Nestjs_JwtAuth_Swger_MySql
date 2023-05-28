export async function checkExistInRepo(
  requestId: number,
  repo: any,
): Promise<boolean> {
  const result = await repo.findOne({
    where: {
      id: requestId,
    },
  });

  return !!result;
}
