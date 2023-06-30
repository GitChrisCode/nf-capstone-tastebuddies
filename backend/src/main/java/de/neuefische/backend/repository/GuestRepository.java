package de.neuefische.backend.repository;

import de.neuefische.backend.model.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface GuestRepository extends MongoRepository<Guest, String> {
    Optional<Guest> findByGuestName(String guestName);
}

