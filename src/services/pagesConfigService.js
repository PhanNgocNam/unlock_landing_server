const db = require("../models");

module.exports.getPagesConfigs = async ({ ...query }) =>
  new Promise(async (resolve, reject) => {
    try {
      const queries = { raw: true, rest: true };
      const response = await db.Page.findAll({
        where: query,
      });
      const data = response.map((item, index) => {
        const { part_id, content } = response[index].dataValues;
        return { part_id, content };
      });
      const newData = {};
      for (const item of data) {
        newData[item.part_id] = item.content;
      }

      resolve({
        err: response ? 0 : 1,
        mes: response ? "Getss" : "Cannot found Page",
        data: newData,
      });
    } catch (error) {
      reject(error);
    }
  });

module.exports.updatePages = ({ part_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const page = await db.Page.findOne({ where: { part_id: part_id } });

      if (!page) {
        return resolve({
          err: 1,
          mes: "Cannot update work. ID not found",
        });
      }

      await page.update(body);
      resolve({
        err: 0,
        status: 200,
        [part_id]: body.content,
      });
    } catch (error) {
      reject(error);
    }
  });
