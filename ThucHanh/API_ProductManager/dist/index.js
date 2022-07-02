"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const Product_1 = require("./src/entity/Product");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = 8081;
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const ProductRepo = connection.getRepository(Product_1.Product);
    app.post("/product/create", async (req, res) => {
        try {
            const productSearch = await ProductRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    message: "Sản phẩm đã tồn tại"
                });
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            };
            const product = await ProductRepo.save(productData);
            if (product) {
                res.status(200).json({
                    message: "Create product success",
                    product: product
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.listen(PORT, () => {
        console.log("App running with port: " + PORT);
    });
});
app.put("/product/update", async (req, res) => {
    try {
        let productSearch = await ProductRepo.findOneBy({ id: req.body.id });
        if (!productSearch) {
            res.status(500).json({
                message: "Sản phẩm không tồn tại"
            });
        }
        const product = await ProductRepo.update({ id: req.body.id }, req.body);
        res.status(200).json({
            message: "Update product success",
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
app.delete('/product/delete', async (req, res) => {
    try {
        const FindIdUpdate = ProductRepo.findOneBy({ id: req.body.id });
        if (!FindIdUpdate) {
            res.status(500).json({ message: "ko ton tai" });
        }
        const product = ProductRepo.delete({ id: req.body.id });
        res.status(200).json({ message: "delete productsuccess" });
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
app.get("/product/list", async (req, res) => {
    try {
        const products = await ProductRepo.find();
        if (products) {
            res.status(200).json({ message: "success", products: products });
        }
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
app.get('/product/detail', async (req, res) => {
    try {
        let IdProduct = +req.query.productId;
        const product = ProductRepo.findOneBy({ id: IdProduct });
        if (product) {
            res.status(200).json({ message: "success", product });
        }
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
});
//# sourceMappingURL=index.js.map