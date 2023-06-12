package de.neuefische.backend.repository;

import de.neuefische.backend.model.UserTasteBuddies;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface MongoUserTasteBuddiesRepo extends MongoRepository<UserTasteBuddies, String> {
    public Optional<UserTasteBuddies> findUserTasteBuddiesByUsername(String username);
}
