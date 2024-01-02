const Revenue = require('../../models/Revenue');

class RevenueController {
    // [GET] /data/revenue/by-date?date=..
    async getRevenueByDate(req, res) {
        const dateParam = req.query.date;

        // Kiểm tra xem tham số date có tồn tại và có định dạng hợp lệ không
        if (!dateParam) {
            return res.status(400).json({ error: 'Missing date parameter.' });
        }

        const parsedDate = new Date(dateParam);

        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: 'Invalid date parameter format.' });
        }

        try {
            const result = await Revenue.getRevenueByDate(parsedDate);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching revenue data by date:', error.message || error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    // [GET] /data/revenue/by-month?month=..
    async getRevenueByMonth(req, res) {
        const monthParam = req.query.month;

        // Kiểm tra xem tham số month có tồn tại không
        if (!monthParam) {
            return res.status(400).json({ error: 'Missing month parameter.' });
        }

        const parsedMonth = monthParam;
        
        try {
            const result = await Revenue.getRevenueByMonth(parsedMonth);
            res.status(200).json(result);
        } catch (error) {
            console.error('Error fetching revenue data by month:', error.message || error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

module.exports = new RevenueController;