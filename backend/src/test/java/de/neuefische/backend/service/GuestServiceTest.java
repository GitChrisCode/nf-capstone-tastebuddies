package de.neuefische.backend.service;

import de.neuefische.backend.controller.GuestController;
import de.neuefische.backend.model.Guest;
import de.neuefische.backend.repository.GuestRepository;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

class GuestServiceTest {

    GuestRepository guestRepository = mock(GuestRepository.class);

    UUIDService uuidService = mock(UUIDService.class);


    GuestService guestService = new GuestService(guestRepository,uuidService);



    @Test
    public void testAddGuest_Successful() {
        // Given
        Guest guest = new Guest();
        guest.setUserName("MaxMustermann");
        guest.setGuestName("Jaqueline");

        String generatedUUID = "12345678"; // Beispiel UUID
        Mockito.when(uuidService.generateUUID()).thenReturn(generatedUUID);
        Mockito.when(guestRepository.save(guest)).thenReturn(guest);

        // When
        Guest addedGuest = guestService.addGuest(guest);

        // Then
        Assert.assertNotNull(addedGuest);
        Assert.assertEquals(generatedUUID, addedGuest.getGuestID());
        Mockito.verify(uuidService, Mockito.times(1)).generateUUID();
        Mockito.verify(guestRepository, Mockito.times(1)).save(guest);
    }

    @Test
    public void testAddGuest_NullInput() {
        // When
        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            guestService.addGuest(null);
        });

        // Then
        String expectedMessage = "Error: guest is null!!!";
        String actualMessage = exception.getMessage();
        assertEquals(expectedMessage, actualMessage);

        Mockito.verify(uuidService, Mockito.never()).generateUUID();
        Mockito.verify(guestRepository, Mockito.never()).save(Mockito.any());
    }
    @Test
    public void testGetGuestList_NotEmpty() {
        // Given
        List<Guest> guests = new ArrayList<>();
        guests.add(new Guest());
        guests.add(new Guest());
        Mockito.when(guestService.getGuestList()).thenReturn(guests);

        GuestController guestController = new GuestController(guestService);

        // When
        ResponseEntity<List<Guest>> response = guestController.getGuestList();

        // Then
        Assert.assertEquals(HttpStatus.OK, response.getStatusCode());
        Assert.assertEquals(guests, response.getBody());
    }

    @Test
    public void testGetGuestList_Empty() {
        // Given
        List<Guest> guests = new ArrayList<>();
        Mockito.when(guestService.getGuestList()).thenReturn(guests);
        GuestController guestController = new GuestController(guestService);
        // When
        ResponseEntity<List<Guest>> response = guestController.getGuestList();

        // Then
        Assert.assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        Assert.assertNull(response.getBody());
    }
    @Test
    public void testEditGuest_Successful() {
        // Given
        String guestId = "123";


        GuestRepository guestRepository = Mockito.mock(GuestRepository.class);
        Mockito.when(guestRepository.findById(Mockito.eq(guestId))).thenReturn(Optional.empty());
        Mockito.when(guestRepository.save(Mockito.any())).thenAnswer(invocation -> invocation.getArgument(0)); // Rückgabe des gespeicherten Guest-Objekts


        GuestService guestService = new GuestService(guestRepository, uuidService);

        Guest existingGuest = new Guest();
        existingGuest.setGuestID(guestId);
        existingGuest.setUserName("MaxMustermann");
        existingGuest.setGuestName("Paulinchen");
        existingGuest.setIncludeIngredients(new String[]{"Milch", "Eier"});
        existingGuest.setExcludeIngredients(new String[]{"Butter", "Zucker"});
        Mockito.when(guestRepository.findById(Mockito.eq(guestId))).thenReturn(Optional.of(existingGuest));

        Guest updatedGuest = new Guest();
        updatedGuest.setUserName("AntonGross");
        updatedGuest.setGuestName("Isabel");
        updatedGuest.setIncludeIngredients(new String[]{"Kaffee", "Tee"});
        updatedGuest.setExcludeIngredients(new String[]{"Bohnen", "Mais"});

        // When
        Guest editedGuest = guestService.editGuest(guestId, updatedGuest);

        // Then
        Assert.assertNotNull(editedGuest);
        Assert.assertEquals(updatedGuest.getUserName(), editedGuest.getUserName());
        Assert.assertEquals(updatedGuest.getGuestName(), editedGuest.getGuestName());

        Mockito.verify(guestRepository, Mockito.times(1)).save(existingGuest);
    }


    @Test
    public void testEditGuest_NonExistentGuest() {
        // Given
        String guestId = "123"; // Beispielhafte Gast-ID, die nicht existiert
        Mockito.when(guestRepository.findById(guestId)).thenReturn(Optional.empty());

        Guest updatedGuest = new Guest();
        updatedGuest.setUserName("JohnDoe");
        updatedGuest.setGuestName("JaneDoe");

        // When
        Guest editedGuest = guestService.editGuest(guestId, updatedGuest);

        // Then
        Assert.assertNull(editedGuest);
        Mockito.verify(guestRepository, Mockito.never()).save(Mockito.any());
    }
    @Test
    public void testDeleteGuest_Successful() {
        // Given
        String guestId = "123";
        Guest existingGuest = new Guest();
        existingGuest.setGuestID(guestId);
        Mockito.when(guestRepository.findById(guestId)).thenReturn(Optional.of(existingGuest));

        // When
        boolean deleted = guestService.deleteGuest(guestId);

        // Then
        Assert.assertTrue(deleted);
        Mockito.verify(guestRepository, Mockito.times(1)).deleteById(guestId);
    }
    @Test
    public void testDeleteGuest_NonExistentGuest() {
        // Given
        String guestId = "123";
        Mockito.when(guestRepository.findById(guestId)).thenReturn(Optional.empty());

        // When
        boolean deleted = guestService.deleteGuest(guestId);

        // Then
        Assert.assertFalse(deleted);
        Mockito.verify(guestRepository, Mockito.never()).deleteById(guestId);
    }

}