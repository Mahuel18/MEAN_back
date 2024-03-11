"use strict";

var Product = require("../models/product");
var Inventory = require("../models/inventory");
var fs = require("fs");
var path = require("path");

const add_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let data = req.body;

      var img_path = req.files.portada.path;
      var name = img_path.split("\\");
      var portada_name = name[4];

      data.Slug = data.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      data.portada = portada_name;
      let reg = await Product.create(data);

      let inventory = await Inventory.create({
        product: reg._id,
        amount: data.stock,
        admin: req.user.sub,
        amount: data.stock,
        provider: "First Register",
      });

      res.status(200).send({ data: reg, inventory: inventory });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const list_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var filter = req.params["filter"];

      let reg = await Product.find({ name: new RegExp(filter, "i") });

      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const get_portada = async function (req, res) {
  var img = req.params["img"];
  fs.stat("./uploads/products/" + img, function (err) {
    if (!err) {
      let path_img = "./uploads/products/" + img;
      res.status(200).sendFile(path.resolve(path_img));
    } else {
      let path_img = "./uploads/default.jpg" + img;
      res.status(200).sendFile(path.resolve(path_img));
    }
  });
};

const get_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      try {
        var reg = await Product.findById({ _id: id });
        res.status(200).send({ data: reg });
      } catch (error) {
        res.status(200).send({ data: undefined });
      }
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const update_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      let id = req.params["id"];
      let data = req.body;

      if (req.files) {
        var img_path = req.files.portada.path;
        var name = img_path.split("\\");
        var portada_name = name[4];

        let reg = await Product.findByIdAndUpdate(
          { _id: id },
          {
            title: data.title,
            stock: data.stock,
            price: data.price,
            category: data.category,
            description: data.description,
            content: data.content,
            portada: portada_name,
          }
        );
        res.status(200).send({ data: reg });
      } else {
        let reg = await Product.findByIdAndUpdate(
          { _id: id },
          {
            title: data.title,
            stock: data.stock,
            price: data.price,
            category: data.category,
            description: data.description,
            content: data.content,
          }
        );
        fs.stat("./uploads/products/" + img, function (err) {
          if(!err){
            fs.unlink("./uploads/products/" + img, (err)=> {
              if(err) throw err;
            });
            
          }
        });
        res.status(200).send({ data: reg });
      }
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const delete_product_admin = async function (req, res) {
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      let reg = await Product.findByIdAndDelete({ _id: id });

      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
};

const list_invetory_product_admin = async function (req, res){
  if (req.user) {
    if (req.user.role == "admin") {
      var id = req.params["id"];

      let reg = await Inventory.find({ product: id }).populate('admin');

      res.status(200).send({ data: reg });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
}

const delete_inventory_product_admin = async function (req, res){
  if (req.user) {
    if (req.user.role == "admin") {

      var id = req.params["id"];
      let reg = await Inventory.findByIdAndRemove({ _id: id });

      let prod = await Product.findById({_id:reg.product});
      let new_stock = parseInt(prod.stock) - parseInt(reg.amount)

      let product = await Product.findByIdAndUpdate({_id:reg.product}, {
        stock: new_stock
      })

      res.status(200).send({ data: product });
    } else {
      res.status(500).send({ message: "No Access" });
    }
  } else {
    res.status(500).send({ message: "No Access" });
  }
}

module.exports = {
  add_product_admin,
  list_product_admin,
  get_portada,
  get_product_admin,
  update_product_admin,
  delete_product_admin,
  list_invetory_product_admin,
  delete_inventory_product_admin,
};
