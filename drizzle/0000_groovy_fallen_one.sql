CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`config` text NOT NULL,
	`updated_by` text NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
