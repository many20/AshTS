import MNodeList = require("core/NodeList");
import MEntity = require("core/Entity");
import MNode = require("core/Node");
import MComponents = require("core/Components");

export module ash.core {
    /**
	 * The interface for classes that are used to manage NodeLists (set as the familyClass property 
	 * in the Engine object). Most developers don't need to use this since the default implementation
	 * is used by default and suits most needs.
	 */
    export interface IFamily<T extends MNode.ash.core.Node<T>> {
        /**
		 * Returns the NodeList managed by this class. This should be a reference that remains valid always
		 * since it is retained and reused by Systems that use the list. i.e. never recreate the list,
		 * always modify it in place.
		 */
        nodeList(): MNodeList.ash.core.NodeList<T>;
        /**
		 * An entity has been added to the engine. It may already have components so test the entity
		 * for inclusion in this family's NodeList.
		 */
        newEntity(entity: MEntity.ash.core.Entity);
        /**
		 * An entity has been removed from the engine. If it's in this family's NodeList it should be removed.
		 */
        removeEntity(entity: MEntity.ash.core.Entity);
        /**
		 * A component has been added to an entity. Test whether the entity's inclusion in this family's
		 * NodeList should be modified.
		 */
        componentAddedToEntity(entity: MEntity.ash.core.Entity, componentClass: MComponents.ash.core.ComponentsClass);
        /**
		 * A component has been removed from an entity. Test whether the entity's inclusion in this family's
		 * NodeList should be modified.
		 */
        componentRemovedFromEntity(entity: MEntity.ash.core.Entity, componentClass: MComponents.ash.core.ComponentsClass);
        /**
		 * The family is about to be discarded. Clean up all properties as necessary. Usually, you will
		 * want to empty the NodeList at this time.
		 */
        cleanUp();
    }
}