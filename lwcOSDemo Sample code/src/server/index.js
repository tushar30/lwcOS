const jsforce = require('jsforce');
require('dotenv').config();
const { SF_USERNAME, SF_PASSWORD, SF_TOKEN, SF_LOGIN_URL } = process.env;
if (!(SF_USERNAME && SF_PASSWORD && SF_TOKEN && SF_LOGIN_URL)) {
    console.error(
        'Cannot start app: missing mandatory configuration. Check your .env file.'
    );
    process.exit(-1);
}
const conn = new jsforce.Connection({
    loginUrl: SF_LOGIN_URL
});
conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, err => {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
});
// eslint-disable-next-line no-undef
module.exports = app => {
    // put your app logic here
    app.get('/api/contacts', (req, res) => {
        const soql = `SELECT Id, FirstName, LastName, Email 
            FROM Contact LIMIT 10`;
            conn.query(soql, (err, result) => {
                if (err) {
                    res.sendStatus(500);
                } else if (result.records.length === 0) {
                    res.status(404).send('Contact not found.');
                } else {
                    console.log('Data is here');
                    console.log(result.records);
                    const formattedData = result.records.map(conRecord => {                        
                        return {
                            id: conRecord.Id,
                            firstName: conRecord.FirstName,
                            lastName: conRecord.LastName,
                            email: conRecord.Email,
                            
                        };
                    });
                    res.send({ data: formattedData });
                }
            });
    });
};
