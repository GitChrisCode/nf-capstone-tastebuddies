package de.neuefische.backend.repository;

import de.neuefische.backend.model.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GuestRepository extends MongoRepository<Guest, String> {
}

