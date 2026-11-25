import db from "../utils/db.js";
import path from 'path'
import fs from "fs";

// ____________________add assets____________________________
export const createAsset = async (req, res) => {
    try {

        const { asset_id, category, asset_name } = req.body;
        const photograph = req.file ? req.file.filename : null;
        if (!asset_id || !category || !asset_name) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const query = db.prepare(`INSERT INTO assets (asset_id, category,asset_name , photograph) VALUES (?, ?, ?,?)`);
        const result = query.run(
            asset_id,
            category,
            asset_name,
            photograph
        );
        res.status(201).json({
            message: "Asset created successfully",
            asset_id: asset_id,
            asset_name: asset_name,
            category: category,
            photograph: photograph
        });
    }
    catch (error) {
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                message: "Asset ID already exists"
            });
        }
    }
}





export const updateAsset = (req, res) => {
    try {
        const { id } = req.params;
        const { asset_id, asset_name, category } = req.body;
        const asset = db.prepare("SELECT * FROM assets WHERE id = ?").get(id);
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }
         if (
            asset_id === undefined &&
            asset_name === undefined &&
            category === undefined &&
            !req.file
        ) {
            return res.status(400).json({
                message: "Feild Requried"
            });
        }

        const newAssetId = asset_id ?? asset.asset_id;
        const newAssetName = asset_name ?? asset.asset_name;
        const newCategory = category ?? asset.category;
        const photograph = req.file ? req.file.filename : asset.photograph;

        const query = db.prepare(`
            UPDATE assets
            SET asset_id = ?,
                asset_name = ?,
                category = ?,
                photograph = ?
            WHERE id = ?
        `);

        query.run(
            newAssetId,
            newAssetName,
            newCategory,
            photograph,
            id
        );


        if (req.file && asset.photograph) {
            const oldImage = path.join("uploads", asset.photograph);

            if (fs.existsSync(oldImage)) {
                fs.unlinkSync(oldImage);
            }
        }

        res.status(200).json({
            message: "Asset updated successfully",
            asset_id,
            asset_name,
            category,
            photograph
        });

    } catch (error) {

        if (req.file) {
            const newImage = path.join("uploads", req.file.filename);

            if (fs.existsSync(newImage)) {
                fs.unlinkSync(newImage);
            }
        }

        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({
                message: "Asset ID already exists"
            });
        }

        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};




export const deleteAsset = (req, res) => {
    try {
        const { asset_id } = req.params;
        const asset = db.prepare( "SELECT * FROM assets WHERE id = ?").get(id);
        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            })}
        db.prepare("DELETE FROM assets WHERE id = ?").run(id);
        if (asset.photograph) {
                const imagePath = path.join(
                "uploads",
                asset.photograph
            );
           if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }}

        res.status(200).json({
            message: "Asset deleted successfully"
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};



export const getAllAssets = (req, res) => {
    try {
        const assets = db.prepare(`
            SELECT * FROM assets
            ORDER BY created_at DESC
        `).all();

        return res.status(200).json({
            success: true,
            total: assets.length,
            assets
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};




export const getSingleAsset = (req, res) => {
    try {
        const { asset_id } = req.params;

        const asset = db.prepare(`
            SELECT * FROM assets WHERE asset_id = ?
        `).get(asset_id);

        if (!asset) {
            return res.status(404).json({
                message: "Asset not found"
            });
        }

        return res.status(200).json({
            success: true,
            asset
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};






// ____________________ SEARCH ASSET ____________________

export const searchAsset = (req, res) => {
    try {
        const { asset_id } = req.query;

        if (!asset_id) {
            return res.status(400).json({
                message: "Asset ID is required"
            });
        }

        const assets = db.prepare(`
            SELECT * FROM assets
            WHERE asset_id LIKE ?
            ORDER BY created_at DESC
        `).all(`%${asset_id}%`);

        return res.status(200).json({
            success: true,
            total: assets.length,
            assets
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal Server Error"
        });
    }   
};