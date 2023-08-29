const db = require("../models");

module.exports.getAllPageElementService = async ({ ...query }) =>
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

module.exports.updateTextElementService = ({ part_id, ...body }) =>
  new Promise(async (resolve, reject) => {
    try {
      const found = await db.Page.count({ where: { part_id: part_id } });

      if (!found) {
        try {
          await db.Page.create({
            part_id: part_id,
            content: body?.content,
            isDeleted: 0,
            permision: -1,
            special: 0,
            createdAt: 232122,
          });
          console.log(2);
          resolve({
            err: 0,
            status: 200,
            [part_id]: body.content,
          });
        } catch (error) {
          console.error("Lỗi khi tạo bản ghi:", error);
          reject(error);
        }
      } else {
        const page = await db.Page.findOne({ where: { part_id: part_id } });
        await page.update(body);
        resolve({
          err: 0,
          status: 200,
          [part_id]: body.content,
        });
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports.updateImageElementService = async (id, filename) => {
  const found = await db.Page.count({ where: { part_id: id } });
  if (!found) {
    const newImgInstance = await db.Page.create({
      part_id: id,
      content: `${process.env.HOST}/assets/images/${filename}`,
      isDeleted: 0,
      permision: 0,
      special: 0,
      createdAt: new Date().getTime(),
    });
    return newImgInstance.dataValues;
  } else {
    const imgInstance = await db.Page.findOne({ where: { part_id: id } });
    imgInstance.content = `${process.env.HOST}/assets/images/${filename}`;
    await imgInstance.save();
    return imgInstance.dataValues;
  }
};
