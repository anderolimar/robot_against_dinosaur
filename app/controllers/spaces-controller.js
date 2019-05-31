class SpacesController {
    static newSpace(req, res) {
        res.json({
        	id: 1,
        	lines: {start: 1, end: 50},
        	columns: {start: 1, end: 50},
        	filled: [] 
        });
    }
}

module.exports = SpacesController;