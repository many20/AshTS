import MNode = require("core/Node");

export module ash.core {
    /**
	 * This export class maintains a pool of deleted nodes for reuse by the framework. This reduces the overhead
	 * from object creation and garbage collection.
	 * 
	 * Because nodes may be deleted from a NodeList while in use, by deleting Nodes from a NodeList
	 * while iterating through the NodeList, the pool also maintains a cache of nodes that are added to the pool
	 * but should not be reused yet. They are then released into the pool by calling the releaseCache method.
	 */
    export class NodePool<T extends MNode.ash.core.Node<T>> {
        private _tail: T;
        private _nodeClass: MNode.ash.core.NodeClass<T>;
        private _cacheTail: T;

        /**
		 * Creates a pool for the given node class.
		 */
        constructor(nodeClass: MNode.ash.core.NodeClass<T>) {
            this._nodeClass = nodeClass;
        }

        /**
		 * Fetches a node from the pool.
		 */
        get(): T {
            if (this._tail) {
                var node = this._tail;
                this._tail = this._tail.previous;
                node.previous = null;
                return node;
            } else {
                //TODO: not really nice
                return <T>new MNode.ash.core.Node<T>(); //new this._nodeClass();
            }
        }

        /**
		 * Adds a node to the pool.
		 */
        public dispose(node: T) {
            node.next = null;
            node.previous = this._tail;
            this._tail = node;
        }

        /**
		 * Adds a node to the cache
		 */
        public cache(node: T) {
            node.previous = this._cacheTail;
            this._cacheTail = node;
        }

        /**
		 * Releases all nodes from the cache into the pool
		 */
        public releaseCache() {
            while (this._cacheTail) {
                var node = this._cacheTail;
                this._cacheTail = node.previous;
                node.next = null;
                node.previous = this._tail;
                this._tail = node;
            }
        }
    }
}