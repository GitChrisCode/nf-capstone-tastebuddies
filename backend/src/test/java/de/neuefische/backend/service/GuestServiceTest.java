package de.neuefische.backend.service;

import de.neuefische.backend.controller.GuestController;
import de.neuefische.backend.model.Guest;
import de.neuefische.backend.repository.GuestRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class GuestServiceTest {

    GuestRepository guestRepository = mock(GuestRepository.class);

    UUIDService uuidService = mock(UUIDService.class);


    GuestService guestService = new GuestService(guestRepository,uuidService);



    @Test
    void testAddGuest_Successful() {
        // Given
        Guest guest = new Guest();
        guest.setUserName("MaxMustermann");
        guest.setGuestName("Jaqueline");

        String generatedUUID = "12345678";
        when(uuidService.generateUUID()).thenReturn(generatedUUID);
        when(guestRepository.save(guest)).thenReturn(guest);

        // When
        Guest addedGuest = guestService.addGuest(guest);

        // Then
        assertNotNull(addedGuest);
        assertEquals(generatedUUID, addedGuest.getGuestID());
        verify(uuidService, Mockito.times(1)).generateUUID();
        verify(guestRepository, Mockito.times(1)).save(guest);
    }

    @Test
    void testAddGuest_NullInput() {
        // When
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class,
                () -> guestService.addGuest(null),
                "Error: guest is null!!!");
        // Then
        String expectedMessage = "Error: guest is null!!!";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);

        verify(uuidService, Mockito.never()).generateUUID();
        verify(guestRepository, Mockito.never()).save(any());
    }
    @Test
    void testGetGuestList_NotEmpty() {
        // Given
        List<Guest> guests = new ArrayList<>();
        guests.add(new Guest());
        guests.add(new Guest());
        when(guestService.getGuestList()).thenReturn(guests);

        GuestController guestController = new GuestController(guestService);

        // When
        ResponseEntity<List<Guest>> response = guestController.getGuestList();

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(guests, response.getBody());
    }

    @Test
    void testGetGuestList_Empty() {
        // Given
        List<Guest> guests = new ArrayList<>();
        when(guestService.getGuestList()).thenReturn(guests);
        GuestController guestController = new GuestController(guestService);
        // When
        ResponseEntity<List<Guest>> response = guestController.getGuestList();

        // Then
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }
    @Test
    void testEditGuest_Successful() {
        // Given
        String guestId = "123";

        Guest existingGuest = new Guest();
        existingGuest.setGuestID(guestId);
        existingGuest.setUserName("MaxMustermann");
        existingGuest.setGuestName("Paulinchen");
        existingGuest.setIncludeIngredients(new String[]{"Milch", "Eier"});
        existingGuest.setExcludeIngredients(new String[]{"Butter", "Zucker"});

        Guest updatedGuest = new Guest();
        updatedGuest.setUserName("AntonGross"); // Aktualisierter Benutzername
        updatedGuest.setGuestName("Isabel");
        updatedGuest.setIncludeIngredients(new String[]{"Kaffee", "Tee"});
        updatedGuest.setExcludeIngredients(new String[]{"Bohnen", "Mais"});

        Guest guestWithSameUserName = new Guest();
        guestWithSameUserName.setGuestID("456");
        guestWithSameUserName.setUserName("MaxMustermann");
        guestWithSameUserName.setGuestName("John");
        guestWithSameUserName.setIncludeIngredients(new String[]{"Eier", "Brot"});
        guestWithSameUserName.setExcludeIngredients(new String[]{"Milch", "Zucker"});

        when(guestRepository.findById(guestId)).thenReturn(Optional.of(existingGuest));
        when(guestRepository.findByUserName(existingGuest.getUserName())).thenReturn(Arrays.asList(existingGuest, guestWithSameUserName));
        when(guestRepository.save(any(Guest.class))).thenReturn(existingGuest);

        // When
        Guest editedGuest = guestService.editGuest(guestId, updatedGuest);

        // Then
        assertNotNull(editedGuest);
        assertEquals(updatedGuest.getUserName(), editedGuest.getUserName());
        assertEquals(updatedGuest.getGuestName(), editedGuest.getGuestName());
    }

    @Test
    void testEditGuest_NonExistentGuest() {
        // Given
        String guestId = "123"; // Beispielhafte Gast-ID, die nicht existiert
        Guest updatedGuest = new Guest();
        updatedGuest.setUserName("JohnDoe");
        updatedGuest.setGuestName("JaneDoe");

        when(guestRepository.findById(guestId)).thenReturn(Optional.empty());

        // When
        Guest editedGuest = guestService.editGuest(guestId, updatedGuest);

        // Then
        assertNull(editedGuest);
        verify(guestRepository, never()).save(any());
    }
    @Test
    void testGetGuestByGuestName_ReturnsGuest_WhenGuestExists() {
        // Given
        String guestName = "John";
        Guest expectedGuest = new Guest();
        expectedGuest.setGuestID("1");
        expectedGuest.setGuestName(guestName);


        GuestRepository guestRepository = mock(GuestRepository.class);
        when(guestRepository.findByGuestName(guestName)).thenReturn(Optional.of(expectedGuest));

        GuestService guestService = new GuestService(guestRepository, uuidService);

        // When
        ResponseEntity<Guest> response = guestService.getGuestByGuestName(guestName);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedGuest, response.getBody());
    }
    @Test
    void testGetGuestByGuestName_ReturnsNotFound_WhenGuestDoesNotExist() {
        // Given
        String guestName = "NonExistingGuest";

        GuestRepository guestRepository = mock(GuestRepository.class);
        when(guestRepository.findByGuestName(guestName)).thenReturn(Optional.empty());

        GuestService guestService = new GuestService(guestRepository,uuidService);

        // When
        ResponseEntity<Guest> response = guestService.getGuestByGuestName(guestName);

        // Then
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

}