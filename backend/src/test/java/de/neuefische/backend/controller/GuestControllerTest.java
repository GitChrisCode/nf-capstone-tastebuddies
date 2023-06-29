package de.neuefische.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Guest;
import de.neuefische.backend.model.RecipeCollection;
import de.neuefische.backend.service.GuestService;
import de.neuefische.backend.service.RecipeService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest
@AutoConfigureMockMvc
class GuestControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private GuestService mockGuestService;
    @Autowired
    private GuestController mockGuestController;

    @Test
    public void testAddGuest_Successful() {
        // Given
        Guest guest = new Guest();
        guest.setUserName("MaxMustermann");
        guest.setGuestName("Jaqueline");
        when(mockGuestService.addGuest(guest)).thenReturn(guest);

        // When
        ResponseEntity<Guest> response = mockGuestController.addGuest(guest);

        // Then
        Assert.assertEquals(HttpStatus.CREATED, response.getStatusCode());
        Assert.assertEquals(guest, response.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).addGuest(guest);
    }
    @Test
    public void testAddGuest_Failure() {
        // Given
        Guest guest = new Guest();
        guest.setUserName("MaxMustermann");
        guest.setGuestName("Jaqueline");

        Mockito.when(mockGuestService.addGuest(guest)).thenReturn(null);

        // When
        ResponseEntity<Guest> responseEntity = mockGuestController.addGuest(guest);

        // Then
        Assert.assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        Assert.assertNull(responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).addGuest(guest);
    }

    @Test
    public void testGetGuestList_NotEmpty() throws JsonProcessingException {
        // Given
        String response = """
        [
          {
            "guestID": "12345",
            "userName": "MaxMustermann",
            "guestName": "Paulinchen",
            "includeIngredients": ["Milch", "Eier"],
            "excludeIngredients": ["Butter", "Zucker"]
          }
        ]
        """;

        ObjectMapper objectMapper = new ObjectMapper();
        List<Guest> expectedGuestList = objectMapper.readValue(response, new TypeReference<List<Guest>>() {});

        // When
        when(mockGuestService.getGuestList()).thenReturn(expectedGuestList);

        ResponseEntity<List<Guest>> responseEntity = mockGuestController.getGuestList();

        // Then
        Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assert.assertEquals(expectedGuestList, responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).getGuestList();
    }

    @Test
    public void testGetGuestList_Empty() {
        // Given
        List<Guest> emptyGuestList = new ArrayList<>();

        // When
        when(mockGuestService.getGuestList()).thenReturn(emptyGuestList);

        ResponseEntity<List<Guest>> responseEntity = mockGuestController.getGuestList();

        // Then
        Assert.assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        Assert.assertNull(responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).getGuestList();
    }

    @Test
    public void testEditGuest_Successful() throws JsonProcessingException {
        // Given
        String guestId = "12345";
        String requestBody = """
            {
              "userName": "MaxMustermann",
              "guestName": "Paulinchen",
              "includeIngredients": ["Milch", "Eier"],
              "excludeIngredients": ["Butter", "Zucker"]
            }
            """;

        Guest updatedGuest = new ObjectMapper().readValue(requestBody, Guest.class);

        Mockito.when(mockGuestService.editGuest(guestId, updatedGuest)).thenReturn(updatedGuest);

        // When
        ResponseEntity<Guest> responseEntity = mockGuestController.editGuest(guestId, updatedGuest);

        // Then
        Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        Assert.assertEquals(updatedGuest, responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).editGuest(guestId, updatedGuest);
    }

    @Test
    public void testEditGuest_NotFound() throws JsonProcessingException {
        // Given
        String guestId = "12345";
        String requestJson = """
        {
            "userName": "MaxMustermann",
            "guestName": "Paulinchen",
            "includeIngredients": ["Milch", "Eier"],
            "excludeIngredients": ["Butter", "Zucker"]
        }
        """;

        ObjectMapper objectMapper = new ObjectMapper();
        Guest updatedGuest = objectMapper.readValue(requestJson, Guest.class);

        Mockito.when(mockGuestService.editGuest(guestId, updatedGuest)).thenReturn(null);

        // When
        ResponseEntity<Guest> responseEntity = mockGuestController.editGuest(guestId, updatedGuest);

        // Then
        Assert.assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        Assert.assertNull(responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).editGuest(guestId, updatedGuest);
    }

    @Test
    public void testDeleteGuest_Successful() {
        // Given
        String guestId = "12345";
        Mockito.when(mockGuestService.deleteGuest(guestId)).thenReturn(true);

        // When
        ResponseEntity<Void> responseEntity = mockGuestController.deleteGuest(guestId);

        // Then
        Assert.assertEquals(HttpStatus.NO_CONTENT, responseEntity.getStatusCode());
        Assert.assertNull(responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).deleteGuest(guestId);
    }

    @Test
    public void testDeleteGuest_GuestNotFound() {
        // Given
        String guestId = "12345";
        Mockito.when(mockGuestService.deleteGuest(guestId)).thenReturn(false);

        // When
        ResponseEntity<Void> responseEntity = mockGuestController.deleteGuest(guestId);

        // Then
        Assert.assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        Assert.assertNull(responseEntity.getBody());
        Mockito.verify(mockGuestService, Mockito.times(1)).deleteGuest(guestId);
    }
}