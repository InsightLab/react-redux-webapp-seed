export const ActionsUtils = {
  forwardPayload:
    <Payload>(type: string) =>
    (payload: Payload) => ({
      type,
      payload,
    }),

  simple: (type: string) => () => ({ type }),
};
