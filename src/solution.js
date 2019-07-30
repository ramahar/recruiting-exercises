// Inventory Allocator Class with relevant functions 
class InventoryAllocator {
  // Constructor includes object to store shipments and an inventory distribution array 
  constructor(shipments = {}, distribution = []) {
    this.shipments = shipments; 
    this.distribution = distribution; 
  }

  // Function to handle shipments
  handleShipment(warehouse, shipments) {
    let inventory = warehouse.inventory;
    let result;
    for (let item in shipments) {
      let inventoryAmount = inventory[item];
      let orders = shipments[item];
      // If inventory exists, handle shipment 
      if (inventoryAmount && orders) { 
        if (!result) result = {}; 
        if (inventoryAmount >= orders) { 
          result[item] = orders;
          delete shipments[item];
        } else {
          result[item] = inventoryAmount;
          shipments[item] -= inventoryAmount
        }
      }
    }
    return result;
  }
  
  // Function to find the cheapest shipment 
  cheapestShipment() {
    let { shipments, inventoryDist } = this;
    if (!inventoryDist.length) return []; 
    // Create copy of shipments to retain original shipment
    shipments = Object.assign({}, shipments);
    let ship = [];


    for (let warehouse of inventoryDist) {
      // Check if any items from the order exist in the warehouse 
      let items = this.handleShipment(warehouse, shipments);
      if (items) ship.push({ [warehouse.name]: items }); 
      // Conditional to check if shipments object is empty 
      if (this.objectIsEmpty(shipments)) return ship; 
    }

    if (!this.objectIsEmpty(shipments)) return []; 
    return ship;
  }
  
  // Adds a single item to the shipments when its empty 
  addShipments(item, amount) {
    this.shipments[item] = amount + this.shipments[item] || amount;
    return this.shipments;
  }

  // Helper function to check if object is empty 
  objectIsEmpty(obj) { 
    for (var key in obj) {
      if(obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
}

module.exports = InventoryAllocator;