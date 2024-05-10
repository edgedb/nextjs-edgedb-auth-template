CREATE MIGRATION m1oahnw4mmttenrs2qj3fp66wpmymvzo2q5xm5xcjwurr2wq5cdsyq
    ONTO m1jmnkd6wixprzmw5iac4yuqcjxp7s7k3lj4pg6n4wp6lf4qrshjyq
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
