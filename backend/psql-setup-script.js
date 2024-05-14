const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(process.env.SCHEMA)) {
        await sequelize.createSchema(process.env.SCHEMA);
    }
});

//will be used in production, not used in local development
// a SCHEMA is a partition between sections of our db to allow
// us to mimic having multiple databases (subdatabases within one db)
