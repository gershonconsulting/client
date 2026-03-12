-- Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  pipeline_key TEXT NOT NULL,
  url TEXT NOT NULL,
  promote_url TEXT,
  network_url TEXT,
  network_sheet_gid TEXT,
  engage_url TEXT,
  notion_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Create index on key for faster lookups
CREATE INDEX IF NOT EXISTS idx_companies_key ON companies(key);
