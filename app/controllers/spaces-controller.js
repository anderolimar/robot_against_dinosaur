class SpacesController {
    static newSpace(req, res) {
        res.json({
        	id: 1,
        	lines: {from: 1, to: 50},
        	columns: {from: 1, to: 50},
        	filled: [] 
        });
    }
}

module.exports = SpacesController;