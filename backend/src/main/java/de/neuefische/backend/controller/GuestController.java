package de.neuefische.backend.controller;

import de.neuefische.backend.model.Guest;
import de.neuefische.backend.service.GuestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tb/user/guest")
@RequiredArgsConstructor
public class GuestController {
    private final GuestService guestService;

    @PostMapping
    public ResponseEntity<Guest> addGuest(@RequestBody Guest guest) {
        Guest newGuest = guestService.addGuest(guest);

        if (newGuest != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(newGuest);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/find/{guestName}")
    public ResponseEntity<Guest> findGuest(@PathVariable String guestName) {
        return guestService.getGuestByGuestName(guestName);
    }


    @GetMapping
    public ResponseEntity<List<Guest>> getGuestList() {
        List<Guest> guests = guestService.getGuestList();

        if (!guests.isEmpty()) {
            return ResponseEntity.ok(guests);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/{guestId}")
    public ResponseEntity<Guest> editGuest(@PathVariable String guestId, @RequestBody Guest updatedGuest) {
        Guest editedGuest = guestService.editGuest(guestId, updatedGuest);

        if (editedGuest != null) {
            return ResponseEntity.ok(editedGuest);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{guestId}")
    public ResponseEntity<Void> deleteGuest(@PathVariable String guestId) {
        boolean isDeleted = guestService.deleteGuest(guestId);

        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
