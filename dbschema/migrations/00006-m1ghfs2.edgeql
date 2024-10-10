CREATE MIGRATION m1ghfs2ow45rmgfttrjdoaxb4coe3xugyfq2rxxamxyxx5bp7ewava
    ONTO m1oahnw4mmttenrs2qj3fp66wpmymvzo2q5xm5xcjwurr2wq5cdsyq
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY admin_has_full_access
          ALLOW ALL USING (((GLOBAL default::current_user).userRole ?= default::Role.admin));
      CREATE ACCESS POLICY current_user_has_full_access
          ALLOW ALL USING ((.id ?= (GLOBAL default::current_user).id));
      CREATE ACCESS POLICY everyone_read_only
          ALLOW SELECT ;
  };
};
