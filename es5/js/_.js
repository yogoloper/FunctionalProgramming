// _curry
function _curry(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(a, b);
        };
  };
}

// _curryr
function _curryr(fn) {
  return function (a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function (b) {
          return fn(b, a);
        };
  };
}

// _get
var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key];
});

// _filter
function _filter(list, predi) {
  var new_ilst = [];
  _each(list, function (val) {
    if (predi(val)) {
      // predi 함수가 실행되면서 평가된 결과가 참/거짓을 반환하고
      new_ilst.push(val); // 참일경우 새로운 리스트에 추가된다.
    }
  });
  return new_ilst;
}

// _map
function _map(list, mapper) {
  var new_list = [];
  _each(list, function (val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

// _each
function _each(list, iter) {
  for (var i = 0; i < list.length; i++) {
    iter(list[i]);
  }
  return list;
}

var slice = Array.prototype.slice;

// _rest
function _rest(list, num) {
  return slice.call(list, num || 1);
}

// _reduce
function _redude(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }

  _each(list, function (val) {
    memo = iter(memo, val);
  });
  return memo;
}

// _pipe
function _pipe() {
  var fns = arguments; // 여러 개의 함수를 인자로 받음
  return function (arg) {
    return _redude(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

// _go
function _go(arg) {
  var fns = _rest(arguments); // 첫 요소를 제거 하고 배열로 반환
  return _pipe.apply(null, fns)(arg);
}

var _map = _curryr(_map),
  _filter = _curryr(_filter);
