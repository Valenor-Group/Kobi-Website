/*
# Create inquiries table (single-tenant, public submission)

## Purpose
Stores contact / booking inquiries submitted by visitors via the INQUIRE form on the
Kobi! portfolio. The site has no sign-in flow, so submissions are anonymous from the
auth perspective —任何人 with the anon key can insert. Reads/deletes are restricted to
authenticated users (the site owner via the dashboard) to protect submitted emails.

## 1. New Tables
- `inquiries`
  - `id` (uuid, primary key, auto-generated)
  - `subject` (text, not null) — the inquiry subject line, e.g. "MIXING"
  - `email` (text, not null) — submitter's contact email
  - `message` (text, not null) — the inquiry body
  - `status` (text, not null, default 'new') — processing state: new | read | archived
  - `created_at` (timestamptz, default now()) — submission timestamp

## 2. Indexes
- `inquiries_created_at_idx` on `created_at DESC` — ordering the inbox.
- `inquiries_status_idx` on `status` — filtering by state.

## 3. Security — Row Level Security
- RLS enabled on `inquiries`.
- INSERT: open to `anon, authenticated` (`WITH CHECK (true)`) so the public form can submit.
- SELECT / UPDATE / DELETE: restricted to `authenticated` only so the site owner can
  read and manage their inbox; anonymous visitors cannot enumerate submissions.
*/

CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS inquiries_status_idx ON inquiries (status);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_inquiries" ON inquiries;
CREATE POLICY "anon_insert_inquiries" ON inquiries FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_inquiries" ON inquiries;
CREATE POLICY "auth_select_inquiries" ON inquiries FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_inquiries" ON inquiries;
CREATE POLICY "auth_update_inquiries" ON inquiries FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_inquiries" ON inquiries;
CREATE POLICY "auth_delete_inquiries" ON inquiries FOR DELETE
  TO authenticated USING (true);
