define(["require", "exports", "core/NodeList", "core/NodePool", "tools/Dictionary"], function (require, exports, MNodeList, MNodePool, MDictionary) {
    "use strict";
    var ash;
    (function (ash) {
        var core;
        (function (core) {
            //import flash.utils.describeType;
            //import flash.utils.getDefinitionByName;
            /**
             * The default class for managing a NodeList. This class creates the NodeList and adds and removes
             * nodes to/from the list as the entities and the components in the engine change.
             *
             * It uses the basic entity matching pattern of an entity system - entities are added to the list if
             * they contain components matching all the public properties of the node class.
             */
            var ComponentMatchingFamily = (function () {
                /**
                 * The constructor. Creates a ComponentMatchingFamily to provide a NodeList for the
                 * given node class.
                 *
                 * @param nodeClass The type of node to create and manage a NodeList for.
                 * @param engine The engine that this family is managing teh NodeList for.
                 */
                function ComponentMatchingFamily(nodeClass, engine) {
                    this._nodeClass = nodeClass;
                    this._engine = engine;
                    this._nodePool = new MNodePool.ash.core.NodePool(this._nodeClass);
                    this._nodes = new MNodeList.ash.core.NodeList();
                    this._entities = new MDictionary.ash.tools.Dictionary();
                    this._components = new MDictionary.ash.tools.Dictionary();
                    this._nodePool.dispose(this._nodePool.get()); // create a dummy instance to ensure describeType works.
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
                ComponentMatchingFamily.prototype._init = function () {
                };
                /**
                 * The nodelist managed by this family. This is a reference that remains valid always
                 * since it is retained and reused by Systems that use the list. i.e. we never recreate the list,
                 * we always modify it in place.
                 */
                ComponentMatchingFamily.prototype.nodeList = function () {
                    return this._nodes;
                };
                /**
                 * Called by the engine when an entity has been added to it. We check if the entity should be in
                 * this family's NodeList and add it if appropriate.
                 */
                ComponentMatchingFamily.prototype.newEntity = function (entity) {
                    this.addIfMatch(entity);
                };
                /**
                 * Called by the engine when a component has been added to an entity. We check if the entity is not in
                 * this family's NodeList and should be, and add it if appropriate.
                 */
                ComponentMatchingFamily.prototype.componentAddedToEntity = function (entity, componentClass) {
                    this.addIfMatch(entity);
                };
                /**
                 * Called by the engine when a component has been removed from an entity. We check if the removed component
                 * is required by this family's NodeList and if so, we check if the entity is in this this NodeList and
                 * remove it if so.
                 */
                ComponentMatchingFamily.prototype.componentRemovedFromEntity = function (entity, componentClass) {
                    if (this._components.has(componentClass)) {
                        this.removeIfMatch(entity);
                    }
                };
                /**
                 * Called by the engine when an entity has been rmoved from it. We check if the entity is in
                 * this family's NodeList and remove it if so.
                 */
                ComponentMatchingFamily.prototype.removeEntity = function (entity) {
                    this.removeIfMatch(entity);
                };
                /**
                 * If the entity is not in this family's NodeList, tests the components of the entity to see
                 * if it should be in this NodeList and adds it if so.
                 */
                ComponentMatchingFamily.prototype.addIfMatch = function (entity) {
                    var _this = this;
                    if (!this._entities.getValue(entity)) {
                        var componentClass;
                        //for (componentClass in this._components) {
                        //    if (!entity.has(componentClass)) {
                        //        return;
                        //    }
                        //}
                        this._components.forEach(function () {
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
                        this._components.forEach(function () {
                            node[_this._components[componentClass]] = entity.get(componentClass);
                        });
                        this._entities.add(entity, node);
                        this._nodes.add(node);
                    }
                };
                /**
                 * Removes the entity if it is in this family's NodeList.
                 */
                ComponentMatchingFamily.prototype.removeIfMatch = function (entity) {
                    if (this._entities.getValue(entity)) {
                        var node = this._entities.getValue(entity);
                        this._entities.remove(entity);
                        this._nodes.remove(node);
                        if (this._engine.updating) {
                            this._nodePool.cache(node);
                            this._engine.updateComplete.add(this._releaseNodePoolCache, this);
                        }
                        else {
                            this._nodePool.dispose(node);
                        }
                    }
                };
                /**
                 * Releases the nodes that were added to the node pool during this engine update, so they can
                 * be reused.
                 */
                ComponentMatchingFamily.prototype._releaseNodePoolCache = function () {
                    this._engine.updateComplete.remove(this._releaseNodePoolCache);
                    this._nodePool.releaseCache();
                };
                /**
                 * Removes all nodes from the NodeList.
                 */
                ComponentMatchingFamily.prototype.cleanUp = function () {
                    for (var node = this._nodes.head; node; node = node.next) {
                        this._entities.remove(node.entity);
                    }
                    this._nodes.removeAll();
                };
                return ComponentMatchingFamily;
            }());
            core.ComponentMatchingFamily = ComponentMatchingFamily;
        })(core = ash.core || (ash.core = {}));
    })(ash = exports.ash || (exports.ash = {}));
});
