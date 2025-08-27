const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
        console.error('❌ Error opening database:', err.message);
        return;
    }
    console.log('✅ Connected to SQLite database successfully!');
});

async function viewDatabase() {
    try {
        console.log('\n📋 Available tables:');
        const tables = await queryDatabase("SELECT name FROM sqlite_master WHERE type='table';");
        if (tables.length === 0) {
            console.log('No tables found in database');
            return;
        }
        
        tables.forEach(table => {
            console.log(`- ${table.name}`);
        });

        for (const table of tables) {
            await viewTableData(table.name);
        }

    } catch (error) {
        console.error('❌ Error viewing database:', error);
    } finally {
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('\n✅ Database connection closed');
            }
        });
    }
}

async function viewTableData(tableName) {
    try {
        console.log(`\n📊 TABLE: ${tableName.toUpperCase()}`);
        console.log('='.repeat(50));
        
        const schema = await queryDatabase(`PRAGMA table_info(${tableName});`);
        console.log('Schema:');
        schema.forEach(col => {
            console.log(`  ${col.name} (${col.type}) ${col.notnull ? 'NOT NULL' : ''} ${col.pk ? 'PRIMARY KEY' : ''}`);
        });
        
        const countResult = await queryDatabase(`SELECT COUNT(*) as count FROM ${tableName};`);
        const rowCount = countResult[0].count;
        console.log(`\nTotal rows: ${rowCount}`);
        
        if (rowCount === 0) {
            console.log('No data found');
            return;
        }
        
        const limit = Math.min(10, rowCount);
        const data = await queryDatabase(`SELECT * FROM ${tableName} LIMIT ${limit};`);
        
        console.log(`\nSample data (showing ${limit} rows):`);
        data.forEach((row, index) => {
            console.log(`\nRow ${index + 1}:`);
            Object.entries(row).forEach(([key, value]) => {
                let displayValue = value;
                if (value === null) displayValue = 'NULL';
                else if (typeof value === 'string' && value.length > 50) {
                    displayValue = value.substring(0, 50) + '...';
                }
                console.log(`  ${key}: ${displayValue}`);
            });
        });
        
        if (rowCount > limit) {
            console.log(`\n... and ${rowCount - limit} more rows`);
        }
        
    } catch (error) {
        console.error(`❌ Error viewing table ${tableName}:`, error.message);
    }
}

function queryDatabase(sql) {
    return new Promise((resolve, reject) => {
        db.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
}

viewDatabase();
