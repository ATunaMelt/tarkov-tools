import rawData from './data/all-en.json';

const items = Object.fromEntries(
  rawData.map((rawItem) => {
    return [
        rawItem.id,
        {
            id: rawItem.id,
            name: rawItem.name,
            shortName: rawItem.shortName,
            wikiLink: rawItem.wikiLink,
            // imgLink: rawItem.imgBig,
            imgLink: rawItem.img || `https://raw.githack.com/RatScanner/EfTIcons/master/uid/${rawItem.id}.png`,
            imgIconLink: `https://raw.githack.com/RatScanner/EfTIcons/master/uid/${rawItem.id}.png`,
            types: rawItem.types,
            traderName: rawItem.traderName,
            traderPrice: rawItem.traderPrice,
            price: rawItem.price,
            fee: rawItem.fee,
            slots: rawItem.slots,
            itemProperties: rawItem.itemProperties,
            bsgTypes: rawItem.bsgTypes,
            hasGrid: rawItem.hasGrid,
            bestPrice: rawItem.bestPrice,
            bestPriceFee: rawItem.bestPriceFee,
            linkedItems: rawItem.linkedItems,
            basePrice: rawItem.basePrice,
            width: rawItem.width,
            height: rawItem.height,
            urlName: rawItem.urlName,
        },
    ];
  }),
);

export default items;
