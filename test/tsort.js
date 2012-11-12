function checkGraph (graph, id, obj) {
  var item = graph.graph.filter(function (line) {
    return line.id === id;
  })[0];

  if (obj.children) {
    obj.children.forEach(function (child) {
      item.children.should.include(child);
    });
  }

  if (obj.parents) {
    obj.parents.forEach(function (parent) {
      item.parents.should.include(parent);
    });
  }
}

describe('tsort', function () {
  it('should parse a simple graph', function () {
    var edges = [
        [ 'a', 'b' ]
      , [ 'a', 'c' ]
      , [ 'a', 'f' ]
      , [ 'd', 'e' ]
      , [ 'b', 'd' ]
    ];

    var graph = tsort(edges);

    graph.should.have.property('path')
      .an('array')
      .deep.equal([ 'a', 'f', 'c', 'b', 'd', 'e' ]);

    checkGraph(graph, 'a', {
      children: [ 'b', 'c', 'f' ]
    });

    checkGraph(graph, 'b', {
        children: [ 'd' ]
      , parents: [ 'a' ]
    });

    checkGraph(graph, 'c', {
      parents: [ 'a' ]
    });

    checkGraph(graph, 'd', {
        children: [ 'e' ]
      , parents: [ 'b' ]
    });

    checkGraph(graph, 'e', {
        parents: [ 'd' ]
    });
  });

  it('should allow for null', function () {
    var edges = [
        [ null, 'a' ]
      , [ 'a', 'b' ]
      , [ 'a', 'c' ]
      , [ 'a', 'f' ]
      , [ null, 'f' ]
      , [ 'd', 'e' ]
      , [ 'b', 'd' ]
    ];

    var graph = tsort(edges);

    graph.should.have.property('path')
      .an('array')
      .deep.equal([ 'a', 'f', 'c', 'b', 'd', 'e' ]);

    checkGraph(graph, 'a', {
      children: [ 'b', 'c', 'f' ]
    });

    checkGraph(graph, 'b', {
        children: [ 'd' ]
      , parents: [ 'a' ]
    });

    checkGraph(graph, 'c', {
      parents: [ 'a' ]
    });

    checkGraph(graph, 'd', {
        children: [ 'e' ]
      , parents: [ 'b' ]
    });

    checkGraph(graph, 'e', {
        parents: [ 'd' ]
    });
  });

  it('should provide error on cyclical', function () {
    var edges = [
        [ 'a', 'b' ]
      , [ 'b', 'a' ]
    ];

    var graph = tsort(edges);

    graph.should.have.property('error');
    graph.error.should.be.instanceof(Error)
      .with.property('message', 'b can not come before a');
  });
});
