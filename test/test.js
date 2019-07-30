const { expect } = require("chai");
const InventoryAllocator = require("../src/solution");


describe('InventoryAllocator', () => {
  beforeEach(() => {
    inventoryAllocator = new InventoryAllocator();
  });

  describe("#Constructor", () => {
    it("Should exist", () => {
      expect(InventoryAllocator).to.exist;
    });
  });

  describe("#addShipments", () => {
    it("Should add a single item to shipments when its empty", () => {
      const item = { apple: 5 };
      inventoryAllocator.addShipments("apple", item.apple);
      expect(inventoryAllocator.shipments).to.deep.equal(item);
    });

    it("Should add multiple items to shipments when its empty", () => {
      const item1 = { apple: 7 };
      const item2 = { orange: 5 };
      const item3 = { apple: 3 };
      inventoryAllocator.addShipments("apple", item1.apple);
      inventoryAllocator.addShipments("orange", item2.orange);
      inventoryAllocator.addShipments("apple", item3.apple);
      expect(inventoryAllocator.shipments).to.deep.equal({ apple: 10, orange: 5 });
    });
  });

  describe('#cheapestShipment', () => {
    it('Should return [] if there are no shipments', () => {
      const newInventoryDist = [{ name: 'owd', inventory: { apple: 0 } }];
      inventoryAllocator.shipments = [];
      inventoryAllocator.inventoryDist = newInventoryDist;
      expect(inventoryAllocator.cheapestShipment()).to.be.empty;

      const newOrder = { apple: 1 };
      inventoryAllocator.shipments = newOrder;
      inventoryAllocator.inventoryDist = [];
      expect(inventoryAllocator.cheapestShipment()).to.be.empty;
    });

    it("Should return [] for insufficient inventory", () => {
      const newOrder = { apples: 1 };
      const inventoryDist = [{ name: "owd", inventory: { apples: 0 } }];
      inventoryAllocator.inventoryDist = inventoryDist;
      inventoryAllocator.shipments = newOrder; 
      expect(inventoryAllocator.cheapestShipment()).to.deep.equal([]);
    });

    it("Should allocate single shipment correctly", () => {
      const newOrder = { apples: 1 };
      const inventoryDist = [
        { name: "owd", inventory: { apples: 5, oranges: 10 } },
        { name: "dm", inventory: { bananas: 5, oranges: 10 } }
      ];
      const solution = [{ owd: { apples: 1 } }];
      inventoryAllocator.inventoryDist = inventoryDist;
      inventoryAllocator.shipments = newOrder;
      expect(inventoryAllocator.cheapestShipment()).to.deep.equal(solution);
    });
      
    it("Should return the shipment if the order matches the shipment", () => {
      const newOrder = { carrot: 1 };
      const newInventoryDist = [{ name: "owd", inventory: { carrot: 1 }}];
      inventoryAllocator.inventoryDist = newInventoryDist;
      inventoryAllocator.shipments = newOrder;
      expect(inventoryAllocator.cheapestShipment()).to.eql([{ owd: { carrot: 1 } }]);
    });

    it("Should return the exact shipment when there is extra inventory", () => {
      let newOrder = { strawberry: 10, blueberry: 15 };
      let newInventoryDist = [
        { name: "dm", inventory: { strawberry: 25, blueberry: 30 } }
      ];
      inventoryAllocator.shipments = newOrder;
      inventoryAllocator.inventoryDist = newInventoryDist;
      expect(inventoryAllocator.cheapestShipment()).to.eql([{ dm: { strawberry: 10, blueberry: 15 } }]);
    });

    it('Should allocate multiple inventories properly', () => {
      const newOrder = { apples: 3, blueberry: 2 };
      const newInventoryDist = [{ name: 'cal', inventory: { apples: 1, blueberry: 1 } },
        { name: 'TX', inventory: { apples: 1 } },
        { name: 'NY', inventory: { apples: 1, blueberry: 2 } }];
      const solution = [{ cal: { apples: 1, blueberry: 1 } }, { TX: { apples: 1 } }, { NY: { apples: 1, blueberry: 1 }}];
      inventoryAllocator.inventoryDist = newInventoryDist;
      inventoryAllocator.shipments  = newOrder;
      expect(inventoryAllocator.cheapestShipment()).to.deep.equal(solution);
    });
  });
});