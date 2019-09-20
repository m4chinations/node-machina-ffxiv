const MachinaModels = require("./_MachinaModels.js");
const MateriaHelper = require("./_MateriaHelper.js");

const LISTING_LENGTH = 156;

module.exports = async (struct) => {
    struct.itemCatalogId = MachinaModels.getUint32(struct.data, 0x00);
    struct.itemCatalogId2 = MachinaModels.getUint32(struct.data, 0x04);

    struct.listings = [];
    for (let i = 0; i < 20; i++) {
        const salePrice = MachinaModels.getUint32(struct.data, 0x08 + (LISTING_LENGTH * i));
        if (salePrice === 0) break;

        let itemListing = {};

        itemListing.salePrice = salePrice;
        itemListing.purchaseTime = MachinaModels.getUint32(struct.data, 0x0C + (LISTING_LENGTH * i));
        itemListing.quantity = MachinaModels.getUint32(struct.data, 0x10 + (LISTING_LENGTH * i));
        itemListing.hq = struct.data[0x11 + (LISTING_LENGTH * i)] === 1 ? true : false;
        itemListing.onMannequin = struct.data[0x13 + (LISTING_LENGTH * i)] === 1 ? true : false;
        itemListing.buyerName = String.fromCodePoint(...struct.data.slice(0x14 + (LISTING_LENGTH * i), 0x35 + (LISTING_LENGTH * i))).replace(/\0/g, "");;
        itemListing.itemCatalogId = MachinaModels.getUint16(struct.data, 0x38 + (LISTING_LENGTH * i));

        struct.listings.push(itemListing);
    }
};