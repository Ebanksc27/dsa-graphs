class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // Add a single node
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // Add an array of nodes
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // Add an edge between two nodes
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1); // Omit for directed graph
  }

  // Remove an edge between two nodes
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1); // Omit for directed graph
  }

  // Remove a node and all edges associated with it
  removeVertex(vertex) {
    for (const node of this.nodes) {
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // Depth-first search (DFS)
  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    const dfs = (vertex) => {
      if (!vertex) return null;
      visited.add(vertex);
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          return dfs(neighbor);
        }
      });
    };

    dfs(start);
    return result;
  }

  // Breadth-first search (BFS)
  breadthFirstSearch(start) {
    const queue = [start];
    const result = [];
    const visited = new Set();
    visited.add(start);

    while (queue.length > 0) {
      const vertex = queue.shift();
      result.push(vertex.value);

      vertex.adjacent.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

module.exports = { Graph, Node };
