const News = require('../model/news.js');
const Category = require('../model/category');
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getNewsById = (req, res, next, id) => {
    News.findById(id)
      .populate("category")
      .exec((err, news) => {
        if (err) {
          return res.status(400).json({
            error: "news not found in DB",
          });
        }
        req.news = news;
        next();
      });
  };

  exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id)
      .exec((err, category) => {
        if (err) {
          return res.status(400).json({
            error: "news not found in DB",
          });
        }
        req.category = category;
        next();
      });
  };

  exports.getNewsByCategoryId = (req,res) => {
     let category = req.category;
     News.find({category: category})
     .populate("author")
     .sort({"createdAt": -1})
     .exec((err,newses) => {
      if (err) {
        return res.status(400).json({
          error: "No news Found",
        });
      }
      res.status(201).json(newses);
     })
  }
  
  exports.createNews = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }
      //Destructure the fields
      const { title, author, description, link, category, publisher } = fields;
      if (!title || !author || !description || !link || !category || !publisher) {
        return res.status(400).json({
          error: "All fields are compulsary!",
        });
      }
  
      let news = new News(fields);
  
      //handle file here
      if (files.photo) {
        if (files.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        news.photo.data = fs.readFileSync(files.photo.path);
        news.photo.contentType = files.photo.type;
      }
      //save to the DB
      news.save((err, news) => {
        if (err) {
          return res.status(400).json({
            error: "Publishing news in DB failed",
          });
        }
        res.json(news);
      });
    });
  };
  
  exports.getProduct = (req, res) => {
    req.news.photo = undefined;
    return res.json(req.product);
  };
  
  //middleware
  exports.photo = (req, res, next) => {
    if (req.news.photo.data) {
      res.set("Content-Type", req.news.photo.contentType);
      return res.send(req.news.photo.data);
    }
    next();
  };
  
  //delete controllers
  exports.deleteNews = (req, res) => {
    let news = req.news;
    news.remove((err, deletedNews) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete the news",
        });
      }
      res.json({
        message: "Successfully deleted news",
      });
    });
  };
  
  //update controllers
  exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: "problem with image",
        });
      }
  
      //updation code
      let product = req.product;
      product = _.extend(product, fields);
  
      //handle file here
      if (files.photo) {
        if (files.photo.size > 3000000) {
          return res.status(400).json({
            error: "File size too big!",
          });
        }
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      //save to the DB
      product.save((err, product) => {
        if (err) {
          return res.status(400).json({
            error: "updation of product failed",
          });
        }
        res.json(product);
      });
    });
  };
  
  //product listing
  exports.getAllNewses = (req, res) => {
    
    News.find()
      .select("-photo")
      .populate("category author")
      .sort({"createdAt": -1})
      .exec((err, newses) => {
        if (err) {
          return res.status(400).json({
            error: "No product Found",
          });
        }
        res.status(201).json(newses);
      });
  };
  
  exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
      if (err) {
        return res.status(400).json({
          error: "No category found",
        });
      }
      res.json(category);
    });
  };
  
  

exports.getNews = async (req, res) => {
    try {
        const size = Number(req.query.size);
        const skip = Number(req.query.page);
        console.log(size, skip)
        const data = await News.find({}).limit(size).skip(size * skip);
        // console.log(data.count());
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

