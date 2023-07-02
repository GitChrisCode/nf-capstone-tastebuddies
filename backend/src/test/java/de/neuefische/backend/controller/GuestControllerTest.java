package de.neuefische.backend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import de.neuefische.backend.model.Guest;
import de.neuefische.backend.service.GuestService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;


import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class GuestControllerTest {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private GuestService mockGuestService;

    @Test
    void testAddGuest_Successful() throws Exception {
        // Given
        String requestGuest = """
                {
                  "userName": "MaxMustermann",
                  "guestName": "Paulinchen",
                  "includeIngredients": ["Milch", "Eier"],
                  "excludeIngredients": ["Butter", "Zucker"]
                }
                """;

        ObjectMapper objectMapper = new ObjectMapper();
        Guest guest = objectMapper.readValue(requestGuest, Guest.class);

        Mockito.when(mockGuestService.addGuest(guest)).thenReturn(guest);

        // When/Then
        mockMvc.perform(MockMvcRequestBuilders.post("/tb/user/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(guest)))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(guest.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.guestName").value(guest.getGuestName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.includeIngredients").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.excludeIngredients").isArray());

        Mockito.verify(mockGuestService, Mockito.times(1)).addGuest(guest);
    }

    @Test
    void testAddGuest_Failure() throws Exception {
        // Given
        String requestGuest = """
                {
                  "userName": "MaxMustermann",
                  "guestName": "Paulinchen",
                  "includeIngredients": ["Milch", "Eier"],
                  "excludeIngredients": ["Butter", "Zucker"]
                }
                """;

        ObjectMapper objectMapper = new ObjectMapper();
        Guest guest = objectMapper.readValue(requestGuest, Guest.class);

        Mockito.when(mockGuestService.addGuest(guest)).thenReturn(null);

        // When/Then
        mockMvc.perform(MockMvcRequestBuilders.post("/tb/user/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(guest)))
                .andExpect(status().isBadRequest());

        Mockito.verify(mockGuestService, Mockito.times(1)).addGuest(guest);
    }

    @Test
    void testGetGuestList_NotEmpty() throws Exception {
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
        List<Guest> expectedGuestList = objectMapper.readValue(response, new TypeReference<>() {});

        Mockito.when(mockGuestService.getGuestList()).thenReturn(expectedGuestList);

        // When/Then
        mockMvc.perform(get("/tb/user/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(expectedGuestList.size()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].guestID").value(expectedGuestList.get(0).getGuestID()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].userName").value(expectedGuestList.get(0).getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].guestName").value(expectedGuestList.get(0).getGuestName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].includeIngredients").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$[0].excludeIngredients").isArray());

        Mockito.verify(mockGuestService, Mockito.times(1)).getGuestList();
    }

    @Test
    void testGetGuestList_Empty() throws Exception {
        // Given
        List<Guest> emptyGuestList = new ArrayList<>();

        Mockito.when(mockGuestService.getGuestList()).thenReturn(emptyGuestList);

        // When/Then
        mockMvc.perform(get("/tb/user/guest")
                        .with(csrf())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());

        Mockito.verify(mockGuestService, Mockito.times(1)).getGuestList();
    }

    @Test
    void testEditGuest_Successful() throws Exception {
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

        // When/Then
        mockMvc.perform(MockMvcRequestBuilders.put("/tb/user/guest/{guestId}", guestId)
                        .with(csrf()) // Include CSRF token
                        .content(requestBody)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(updatedGuest.getUserName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.guestName").value(updatedGuest.getGuestName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.includeIngredients").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.excludeIngredients").isArray());

        Mockito.verify(mockGuestService, Mockito.times(1)).editGuest(guestId, updatedGuest);
    }

    @Test
    void testEditGuest_NotFound() throws Exception {
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

        // When/Then
        mockMvc.perform(MockMvcRequestBuilders.put("/tb/user/guest/{guestId}", guestId)
                        .with(csrf()) // Include CSRF token
                        .content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());

        Mockito.verify(mockGuestService, Mockito.times(1)).editGuest(guestId, updatedGuest);
    }

    @Test
    void testDeleteGuest_Successful() throws Exception {
        // Given
        String guestId = "12345";
        Mockito.when(mockGuestService.deleteGuest(guestId)).thenReturn(true);

        // When
        mockMvc.perform(MockMvcRequestBuilders.delete("/tb/user/guest/{guestId}", guestId).with(csrf()))
                .andExpect(status().isNoContent())
                .andExpect(MockMvcResultMatchers.content().string(""))
                .andReturn();

        // Then
        Mockito.verify(mockGuestService, Mockito.times(1)).deleteGuest(guestId);
    }

    @Test
    void testDeleteGuest_GuestNotFound() throws Exception {
        // Given
        String guestId = "12345";
        Mockito.when(mockGuestService.deleteGuest(guestId)).thenReturn(false);

        // When
        mockMvc.perform(MockMvcRequestBuilders.delete("/tb/user/guest/{guestId}", guestId).with(csrf()))
                .andExpect(status().isNotFound())
                .andExpect(MockMvcResultMatchers.content().string(""))
                .andReturn();

        // Then
        Mockito.verify(mockGuestService, Mockito.times(1)).deleteGuest(guestId);
    }

    @Test
    void testFindGuest_ReturnsGuest_WhenGuestExists() throws Exception {
        // Mock Guest
        Guest mockGuest = new Guest();
        mockGuest.setGuestID("1");
        mockGuest.setGuestName("John");

        // Mock GuestService
        ResponseEntity<Guest> responseEntity = ResponseEntity.ok(mockGuest);
        Mockito.when(mockGuestService.getGuestByGuestName("John")).thenReturn(responseEntity);

        // Perform GET request
        mockMvc.perform(get("/tb/user/guest/find/John")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$.guestID").value("1"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.guestName").value("John"));
    }

    @Test
    void testFindGuest_ReturnsNotFound_WhenGuestDoesNotExist() throws Exception {
        // Mock GuestService
        Mockito.when(mockGuestService.getGuestByGuestName(anyString())).thenReturn(ResponseEntity.notFound().build());

        // Perform GET request
        mockMvc.perform(get("/tb/user/guest/find/NonExistingGuest")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}