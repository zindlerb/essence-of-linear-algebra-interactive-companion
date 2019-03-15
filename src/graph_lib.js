const _ = require('lodash')

// Good ref: https://github.com/dagrejs/graphlib/wiki/API-Reference#alg-postorder
let idCount = 0

class idMaker {
	constructor(prefix) {
		this.count = 0;
		this.prefix = prefix
	}

	genId() {
		this.count++;
		return `${this.prefix}_${this.count}`
	}
}

const linkIdMaker = new idMaker('link')

class Link {
	constructor(vertices, attrs, directed, id) {
		this.id = id || linkIdMaker.genId();
		this.vertices = vertices //[a, b]
		this.attrs = attrs || {}
		this.directed = directed === undefined ? true : directed;
	}
}

const nodeIdMaker = new idMaker('node')

class Node {
	constructor(attrs, edges, id) {
		this.id = id || nodeIdMaker.genId()
		this.attrs = attrs || {}
		this.edges = edges || []
	}
}

class Graph {
	constructor() {
		this._nodes = {}
		this._edges = {}
		this.baseId = 0;
	}

	genId() {
		this.baseId += 1;
		return this.baseId;
	}

	getNode(id) { return this._nodes[id] }
	getEdge(id) { return this._edges[id] }

	addEdge(nodeAId, nodeBId, directed, attrs) {
		const nodeA = this._nodes[nodeAId];
		const nodeB = this._nodes[nodeBId];

		const edge = new Link([nodeA, nodeB], attrs, directed)

		nodeA.edges.push(edge)
		nodeB.edges.push(edge)
		this._edges[edge.id] = edge
		return edge;
	}

	addNode(attrs) {
		const node = new Node(attrs);
		this._nodes[node.id] = node
		return node;
	}

	removeNode(nodeId) {
		const node = this._nodes[nodeId];
		node.edges.forEach((edge) => {
			this.removeEdge(edge.id);
		})

		delete this._nodes[nodeId];
	}

	removeEdge(edgeId) {
		const edge = this._edges[edgeId];
		const [vertexA, vertexB] = edge.vertices;
		this._nodes[vertexA.id].edges.filter((edge) => edge.id != edgeId)
		this._nodes[vertexB.id].edges.filter((edge) => edge.id != edgeId)
		delete this._edges[edgeId];
	}

	allNodes() {
		return Object.values(this._nodes)
	}

	allEdges() {
		return Object.values(this._edges)
	}

	bfs() {

	}

	dfs() {

	}

	// min span tree?
}

class GraphPersistance {
	/*
		serialized form
		{
			nodes: [ { id: , attrs: , } ]
			links: [
				{ id: , source: , target: , blah blah blah... }
			]
		}
	*/
	static serialize(graph) {
		const serializedGraph = {
			nodes: [],
			links: []
		}

		_.forEach(graph._nodes, (node) => {
			const newNode = Object.assign({}, node)
			delete newNode.edges;
			serializedGraph.nodes.push(newNode);
		})

		_.forEach(graph._edges, (edge) => {
			const newEdge = Object.assign({}, edge, {
				source: edge.vertices[0].id,
				target: edge.vertices[1].id
			})

			delete newEdge.vertices;
			serializedGraph.links.push(newEdge);
		})

		return JSON.stringify(serializedGraph);
	}

	static fromGraphSpecToGraph(graphSpec) {
		console.log('graphSpec', graphSpec, typeof graphSpec)
		const graph = new Graph()

		graphSpec.nodes.forEach((node) => {
			graph._nodes[node.id] = new Node(node.attrs, node.edges, node.id)
		})

		graphSpec.links.forEach((link) => {
			const mutableLink = new Link(
				[
					graph._nodes[link.source],
					graph._nodes[link.target]
				],
				link.attrs,
				link.directed,
				link.id
			);

			graph._edges[link.id] = mutableLink

			graph._nodes[link.source].edges.push(mutableLink)
			graph._nodes[link.target].edges.push(mutableLink)
		})

		return graph
	}

	static deserialize(serializedGraph) {
		return this.fromGraphSpecToGraph(JSON.parse(serializedGraph))
	}

	static saveToFile() {

	}

	static transformToDotLang() {

	}

	static loadFromFile() {

	}
}

function dotAlgo() {
	// rank
	// order
	// position
	// make splines
}

exports.Graph = Graph
exports.GraphPersistance = GraphPersistance
