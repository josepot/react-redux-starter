import R from 'ramda';

export default obj => dispatch => {
  const bindActionCreator = actionCreator =>
    (...args) => dispatch(actionCreator(...args));

  function bindRecursively(subObj) {
    return R.map(
      R.cond([
        [R.is(Function), bindActionCreator],
        [R.is(Object), bindRecursively],
        [R.T, () => { throw new Error('Wrong type found'); }],
      ]),
      subObj
    );
  }
  return bindRecursively(obj);
};
