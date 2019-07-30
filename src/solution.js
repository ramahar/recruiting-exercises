// Inventory Allocator Class with relevant functions 
class InventoryAllocator {
  // Constructor includes object to store shipments and inventory distribution
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
    let { shipments, distribution } = this;
    if (!distribution.length) return []; 
    // Create a copy object of shipments to retain original shipments
    shipments = Object.assign({}, shipments);
    let result = [];


    for (let warehouse of distribution) {
      let items = this.handleShipment(warehouse, shipments);
      // Check if items exist in the warehouse 
      if (items) result.push({ [warehouse.name]: items }); // to make sure some items exist in this warehouse;
      if (this.objectIsEmpty(shipments)) return result; // to check if order(shipments) is empty like {}
    }

    if (!this.objectIsEmpty(shipments)) return []; // again check if order(shipments) is empty to make sure all shipments is fullfilled 
    return result;
  }

  // Helper method to check if object is empty
  objectIsEmpty(obj) { 
    for (let key in obj) {
      return false;
    }
    return true;
  }

  // Function to add a single shipment to order 
  addShipments(item, amount) {
    this.shipments[item] = amount + this.shipments[item] || amount;
    return this.shipments;
  }
}
module.exports = InventoryAllocator;