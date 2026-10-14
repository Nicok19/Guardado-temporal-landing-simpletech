// Helpers para simular el backend mientras no exista (env.useMocks).
export const mockDelay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

export async function mockResponse(data, ms) {
  await mockDelay(ms);
  return structuredClone(data);
}
