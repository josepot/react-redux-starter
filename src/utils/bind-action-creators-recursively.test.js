import R from 'ramda';
import bindActionCreatorsRecursively from './bind-action-creators-recursively.js';

describe('bindActionCreatorsRecursively', () => {
  const dispatch = R.prop('type');

  it('should work with a nested action creations object', () => {
    const input = {
      a: () => ({ type: 'a' }),
      b: {
        c: (x) => ({ type: x }),
        d: {
          e: () => ({ type: 'e' }),
        },
        f: () => ({ type: 'f' }),
      },
      g: () => ({ type: 'g' }),
    };

    const resultFn = bindActionCreatorsRecursively(input);

    expect(resultFn).to.be.a('function');
    expect(resultFn.length).to.equal(1);

    const resultObj = resultFn(dispatch);

    expect(resultObj.a()).to.equal('a');
    expect(resultObj.b.c('z')).to.equal('z');
    expect(resultObj.b.d.e()).to.equal('e');
    expect(resultObj.b.f()).to.equal('f');
    expect(resultObj.g()).to.equal('g');
  });

  it('should throw when the object is not valid', () => {
    const input = {
      a: null,
    };
    const resultFn = bindActionCreatorsRecursively(input);
    expect(resultFn.bind(this, dispatch)).to.throw('Wrong type found');
  });
});
