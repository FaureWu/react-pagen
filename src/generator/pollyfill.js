if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    },
    configurable: true,
    writable: true
  });
}

if (typeof Promise !== 'function') {
  throw new TypeError('A global Promise is required')
}

if (typeof Promise.prototype.finally !== 'function') {
  var speciesConstructor = function(O, defaultConstructor) {
    if (!O || (typeof O !== 'object' && typeof O !== 'function')) {
      throw new TypeError('Assertion failed: Type(O) is not Object')
    }
    var C = O.constructor
    if (typeof C === 'undefined') {
      return defaultConstructor
    }
    if (!C || (typeof C !== 'object' && typeof C !== 'function')) {
      throw new TypeError('O.constructor is not an Object')
    }
    var S =
      typeof Symbol === 'function' && typeof Symbol.species === 'symbol'
        ? C[Symbol.species]
        : undefined
    if (S == null) {
      return defaultConstructor
    }
    if (typeof S === 'function' && S.prototype) {
      return S
    }
    throw new TypeError('no constructor found')
  }

  var shim = {
    finally(onFinally) {
      var promise = this
      if (typeof promise !== 'object' || promise === null) {
        throw new TypeError('"this" value is not an Object')
      }
      var C = speciesConstructor(promise, Promise) // throws if SpeciesConstructor throws
      if (typeof onFinally !== 'function') {
        return Promise.prototype.then.call(promise, onFinally, onFinally)
      }
      return Promise.prototype.then.call(
        promise,
        x => new C(resolve => resolve(onFinally())).then(() => x),
        e =>
          new C(resolve => resolve(onFinally())).then(() => {
            throw e
          }),
      )
    },
  }
  Object.defineProperty(Promise.prototype, 'finally', {
    configurable: true,
    writable: true,
    value: shim.finally,
  })
}
