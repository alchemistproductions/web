-- Run once if you already ran schema.sql earlier: live chat + profile backfill
alter table comments replica identity full;
do $$ begin alter publication supabase_realtime add table comments; exception when duplicate_object then null; end $$;
insert into profiles(id,display_name) select id,'Member' from auth.users on conflict do nothing;
