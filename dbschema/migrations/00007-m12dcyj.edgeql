CREATE MIGRATION m12dcyjrsneu2wivwiqi22kdl7q7t6cbkgr5fy5gg4kbgqgkba2oyq
    ONTO m1ghfs2ow45rmgfttrjdoaxb4coe3xugyfq2rxxamxyxx5bp7ewava
{
  ALTER TYPE default::User {
      CREATE ACCESS POLICY everyone_insert_only
          ALLOW INSERT ;
  };
  ALTER TYPE default::User {
      DROP ACCESS POLICY everyone_read_only;
  };
};
