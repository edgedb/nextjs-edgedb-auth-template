CREATE MIGRATION m1kkik345imstfadsie2gxyisjk67c26iweyt74mkyuhrpy3njfajq
    ONTO m1x45xkh6f6etaul2exzk5hvgfwmnp5ekzcxs5hlgyoreau4npp4wa
{
  ALTER GLOBAL default::current_user USING (std::assert_single((SELECT
      default::User
  FILTER
      (.identity = GLOBAL ext::auth::ClientTokenIdentity)
  )));
};
