import db from "../../database/database.ts";
const table = "users";
const model = db.collection(table);

export default {
  count(conditionObject: any) {
    return model.count(conditionObject);
  },

  all() {
    return model.find();
  },

  findWithCondition(conditionObject: any) {
    return model.find(conditionObject);
  },

  findOne(id: any) {
    return model.findOne({ _id: { $oid: id } });
  },

  insertOne(dataObject: any) {
    return model.insertOne(dataObject);
  },

  insertMany(dataArray: any) {
    return model.insertMany(dataArray);
  },

  updateOne(conditionObject: any, dataObject: any) {
    return model.updateOne(conditionObject, dataObject);
  },

  updateMany(conditionObject: any, dataObject: any) {
    return model.updateMany(conditionObject, dataObject);
  },

  deleteOne(id: any) {
    return model.deleteOne({ _id: { $oid: id } });
  },

  deleteMany(conditionObject: any) {
    return model.deleteMany(conditionObject);
  },
};
