export const focus = (payload, dispatch) => {
  dispatch({ type: "focus", id: "i", payload: payload });
};

export const dsp = (type, id, payload, dispatch) => {
  dispatch({ type, id, payload });
};
