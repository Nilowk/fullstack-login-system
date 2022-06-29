package fr.nilowk.sys.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {

    public UserModel findByEmail(String email);

}
