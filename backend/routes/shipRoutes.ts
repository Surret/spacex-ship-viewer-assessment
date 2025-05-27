import * as express from 'express';
import { Request, Response } from 'express';
import { countMissingShipAttributes } from '../queries/shipQueries';
const shipRoutes = express.Router();

// GET /ships/missing-attributes?attributes=home_port,year_built,image
shipRoutes.get('/ships/missing-attributes', async (req: Request, res: Response) => {
    try {
        const attributesString = req.query.attributes as string | undefined;

        if (!attributesString) {
            return res.status(400).json({ error: 'Please provide attribute names in the "attributes" query parameter (comma-separated).' });
        }

        const attributeNames = attributesString.split(',');
        const missingCounts = await countMissingShipAttributes(attributeNames);
        res.json(missingCounts);
    } catch (error) {
        console.error('Error counting missing ship attributes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// You can add other ship-related routes here if needed

export default shipRoutes;