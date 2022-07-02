import {AppDataSource} from "./src/data-source";
import {Blog} from "./src/entity/Blog";

import express from "express";
import bodyParser from 'body-parser';

const PORT = 3000;
AppDataSource.initialize().then(async connection => {

    const app = express();

    app.use(bodyParser.json());

    const blogRepo = connection.getRepository(Blog);

    app.post("/blog/create", async (req, res) => {
        try {
            const blogtSearch = await blogRepo.findOneBy({title: req.body.title});
            if (blogtSearch) {
                res.status(500).json({
                    message: "Sản phẩm đã tồn tại"
                })
            }
            const blogData = {
                title: req.body.title,
                author: req.body.author,
                content: req.body.content
            };

            const product = await blogRepo.save(blogData);
            if (product) {
                res.status(200).json({
                    message: "Create product success",
                    product: product
                });
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    app.put("/blog/update", async (req, res) => {
        try {
            const idBlogtSearch = await blogRepo.findOneBy({id: req.body.id});
            if (idBlogtSearch) {

                const BlogUpdate = {
                    title: req.body.title,
                    author: req.body.author,
                    content: req.body.content
                }

                const update = blogRepo.update({id: req.body.id}, req.body);
                if (update) {
                    res.status(200).json({message: "update successfully", blog: req.body})
                }


            } else {
                res.status(500).json({message: "id not found"})
            }

        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    app.delete("/blog/delete", async (req, res) => {
        try {
            let blogSearch = await blogRepo.findOneBy({id: req.body.id});
            if (!blogSearch) {
                res.status(500).json({
                    mesage: "Blog không tồn tại"
                })
            }
            const blog = await blogRepo.delete({id: req.body.id});
            res.status(200).json({
                message: "Delete blog success",
                blogId: req.body.id
            });
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    });

    app.get('/blog/list', async (req, res) => {
        try {

            const listBlog = await blogRepo.find();
            if (listBlog) {
                res.status(200).json({listBlog: listBlog})
            }

        } catch (e) {
            res.status(500).json({message: e.message})
        }
    })

    app.get('/blog/detail', async (req, res) => {
        try {
            const idBlogDetail = +req.query.id;
            const findBlog = blogRepo.findOneBy({id: idBlogDetail})
            if (findBlog) {
                res.status(200).json({blogDetail: findBlog})
            }
            res.status(500).json({message: "not found"})
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    });

    app.listen(PORT, () => {
        console.log("App running with port: " + PORT)
    })

})