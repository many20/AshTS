import MEngine = require("core/Engine");
import MEntity = require("core/Entity");
import MSystem = require("core/System");
import MEntityList = require("core/EntityList");
import MSystemList = require("core/SystemList");
import MNodeList = require("core/NodeList");
import MNode = require("core/Node");
import MNodePool = require("core/NodePool");
import MFamily = require("core/IFamily");
import MComponents = require("core/Components");

import MSignal = require("tools/Signal");
import MDictionary = require("tools/Dictionary");

export module ash.core {
    import NodeClass = MNode.ash.core.NodeClass; //import flash.utils.Dictionary;
    //import flash.utils.describeType;
    //import flash.utils.getDefinitionByName;

    /**
	 * The default class for managing a NodeList. This class creates the NodeList and adds and removes
	 * nodes to/from the list as the entities and the components in the engine change.
	 * 
	 * It uses the basic entity matching pattern of an entity system - entities are added to the list if
	 * they contain components matching all the public properties of the node class.
	 */
    export class ComponentMatchingFamily<T extends MNode.ash.core.Node<T>> implements MFamily.ash.core.IFamily<T> {
        private _nodes: MNodeList.ash.core.NodeList<T>;
        private _entities: MDictionary.ash.tools.Dictionary;
        private _nodeClass: MNode.ash.core.NodeClass<T>;
        private _components: MDictionary.ash.tools.Dictionary;
        private _nodePool: MNodePool.ash.core.NodePool<T>;
        private _engine: MEngine.ash.core.Engine;

        /**
		 * The constructor. Creates a ComponentMatchingFamily to provide a NodeList for the
		 * given node class.
		 * 
		 * @param nodeClass The type of node to create and manage a NodeList for.
		 * @param engine The engine that this family is managing teh NodeList for.
		 */
        constructor(nodeClass: MNode.ash.core.NodeClass<T>, engine: MEngine.ash.core.Engine) {
            this._nodeClass = nodeClass;
            this._engine = engine;

            this._nodePool = new MNodePool.ash.core.NodePool<T>(this._nodeClass);
            this._nodes = new MNodeList.ash.core.NodeList<T>();
            this._entities = new MDictionary.ash.tools.Dictionary();

            this._components = new MDictionary.ash.tools.Dictionary();
            this._nodePool.dispose(this._nodePool.get()); // create a dummy instance to ensure describeType works.

            for (var property of this._nodeClass.types.keys) {
                var componentsClass = this._nodeClass.types[property];
                this._components.add(componentsClass, property);
            }

            //TODO: not nice, better use static values for types
            //var nodeClassPrototype = this._nodeClass.prototype;
            //for (var property in nodeClassPrototype) {
            //    ///TODO - tidy this up...
            //    if (nodeClassPrototype.hasOwnProperty(property) &&
            //        property != "types" &&
            //        property != "next" &&
            //        property != "previous" &&
            //        property != "constructor" &&
            //        property != "super" &&
            //        property != "extend" &&
            //        property != "entity") {
            //        var componentObject = nodeClassPrototype["types"][property];
            //        this._components.add(componentObject, property);
            //    }
            //}

            this._init();
        }

        /**
		 * Initialises the class. Creates the nodelist and other tools. Analyses the node to determine
		 * what component types the node requires.
		 */
        private _init() {


        }

        /**
		 * The nodelist managed by this family. This is a reference that remains valid always
		 * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
		 * we always modify it in place.
		 */
        public nodeList(): MNodeList.ash.core.NodeList<any> {
            return this._nodes;
        }

        /**
		 * Called by the engine when an entity has been added to it. We check if the entity should be in
		 * this family's NodeList and add it if appropriate.
		 */
        public newEntity(entity: MEntity.ash.core.Entity) {
            this.addIfMatch(entity);
        }

        /**
		 * Called by the engine when a component has been added to an entity. We check if the entity is not in
		 * this family's NodeList and should be, and add it if appropriate.
		 */
        public componentAddedToEntity(entity: MEntity.ash.core.Entity, componentClass: MComponents.ash.core.ComponentsClass) {
            this.addIfMatch(entity);
        }

        /**
		 * Called by the engine when a component has been removed from an entity. We check if the removed component
		 * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
		 * remove it if so.
		 */
        public componentRemovedFromEntity(entity: MEntity.ash.core.Entity, componentClass: MComponents.ash.core.ComponentsClass) {
            if (this._components.has(componentClass)) {
                this.removeIfMatch(entity);
            }
        }

        /**
		 * Called by the engine when an entity has been rmoved from it. We check if the entity is in
		 * this family's NodeList and remove it if so.
		 */
        public removeEntity(entity: MEntity.ash.core.Entity) {
            this.removeIfMatch(entity);
        }

        /**
		 * If the entity is not in this family's NodeList, tests the components of the entity to see
		 * if it should be in this NodeList and adds it if so.
		 */
        public addIfMatch(entity: MEntity.ash.core.Entity) {
            if (!this._entities.getValue(entity)) {
                //var componentClass: any;
                //for (componentClass in this._components) {
                //    if (!entity.has(componentClass)) {
                //        return;
                //    }
                //}
                this._components.forEach((componentClass) => {
                    if (!entity.has(componentClass)) {
                        return;
                    }
                });

                var node = this._nodePool.get();
                node.entity = entity;

                //TODO: if we use //new this._nodeClass(); we dont need this
                //for (componentClass in this._components) {
                //    node[this._components[componentClass]] = entity.get(componentClass);
                //}
                this._components.forEach((componentClass, key) => {
                    node[key] = entity.get(componentClass);
                });

                this._entities.add(entity, node);
                this._nodes.add(node);
            }
        }

        /**
		 * Removes the entity if it is in this family's NodeList.
		 */
        public removeIfMatch(entity: MEntity.ash.core.Entity) {
            if (this._entities.getValue(entity)) {
                var node = <T>this._entities.getValue(entity);
                this._entities.remove(entity);
                this._nodes.remove(node);
                if (this._engine.updating) {
                    this._nodePool.cache(node);
                    this._engine.updateComplete.add(this._releaseNodePoolCache, this);
                } else {
                    this._nodePool.dispose(node);
                }
            }
        }

        /**
		 * Releases the nodes that were added to the node pool during this engine update, so they can
		 * be reused.
		 */
        private _releaseNodePoolCache() {
            this._engine.updateComplete.remove(this._releaseNodePoolCache);
            this._nodePool.releaseCache();
        }

        /**
		 * Removes all nodes from the NodeList.
		 */
        public cleanUp() {
            for (var node = this._nodes.head; node; node = node.next) {
                this._entities.remove(node.entity);
            }
            this._nodes.removeAll();
        }


    }
}