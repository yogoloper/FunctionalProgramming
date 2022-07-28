// _filter
function _filter(list, predi) {
  var new_ilst = [];
  _each(list, function(val) { 
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
  _each(list, function(val) {
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
