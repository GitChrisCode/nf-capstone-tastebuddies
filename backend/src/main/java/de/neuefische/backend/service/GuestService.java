package de.neuefische.backend.service;

import de.neuefische.backend.model.Guest;
import de.neuefische.backend.repository.GuestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GuestService {
    private final GuestRepository guestRepository;
    private final UUIDService uuidService;

    public Guest addGuest(Guest guest){
        if (guest == null) {
            throw new IllegalArgumentException("Error: guest is null!!!");
        }

        guest.setGuestID(uuidService.generateUUID());

        return guestRepository.save(guest);
    }
    public Guest editGuest(String guestId, Guest updatedGuest) {
        Guest existingGuest = guestRepository.findById(guestId).orElse(null);

        if (existingGuest != null) {
            existingGuest.setUserName(updatedGuest.getUserName());
            existingGuest.setGuestName(updatedGuest.getGuestName());
            existingGuest.setIncludeIngredients(updatedGuest.getIncludeIngredients());
            existingGuest.setExcludeIngredients(updatedGuest.getExcludeIngredients());

            return guestRepository.save(existingGuest);
        }
        return null;
    }
    public List<Guest> getGuestList() {
        return guestRepository.findAll();
    }
    public boolean deleteGuest(String guestId) {
        Optional<Guest> optionalGuest = guestRepository.findById(guestId);

        if (optionalGuest.isPresent()) {
            guestRepository.deleteById(guestId);
            return true;
        }
        return false;
    }

    public ResponseEntity<Guest> getGuestByGuestName(String guestName) {
        Optional<Guest> optionalGuest = guestRepository.findByGuestName(guestName);

        if (optionalGuest.isPresent()) {
            Guest guest = optionalGuest.get();
            return ResponseEntity.ok(guest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}