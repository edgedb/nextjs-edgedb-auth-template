CREATE MIGRATION m1jmnkd6wixprzmw5iac4yuqcjxp7s7k3lj4pg6n4wp6lf4qrshjyq
    ONTO m1kkik345imstfadsie2gxyisjk67c26iweyt74mkyuhrpy3njfajq
{
  ALTER TYPE default::User {
      ALTER LINK identity {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
