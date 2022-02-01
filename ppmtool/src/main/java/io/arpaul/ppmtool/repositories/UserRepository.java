package io.arpaul.ppmtool.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import io.arpaul.ppmtool.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long>{

}
