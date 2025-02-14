ALTER TABLE plans add column created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE plans add column updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE plans add column deleted_at datetime;