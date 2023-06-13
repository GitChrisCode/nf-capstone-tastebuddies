package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.service.UserTasteBuddiesDetailsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserTasteBuddiesControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @DirtiesContext
    @Test
   void testRegisterUserTasteBuddies() throws Exception {
        //given
        String userName = "testUser";
        String userPassword = "testPassword";

        // when/then
        mockMvc.perform(post("/tb/user/registration").with(csrf())
                        .param("userName", userName)
                        .param("userPassword", userPassword)
                        )
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(userName));

    }

    @Test
    void testRegisterUserTasteBuddiesV2() {
        // Erstellen Sie eine Mock-Instanz des UserTasteBuddiesDetailsService
        UserTasteBuddiesDetailsService mockService = Mockito.mock(UserTasteBuddiesDetailsService.class);

        // Definieren Sie das erwartete Verhalten der Mock-Instanz
        UserTasteBuddies expectedUser = new UserTasteBuddies();
        expectedUser.setUserName("testUser");
        expectedUser.setUserPassword("testPassword");
        Mockito.when(mockService.registerUserTasteBuddies(anyString(), anyString())).thenReturn(expectedUser);

        // Erstellen Sie eine Instanz des Controllers mit dem Mock-Service
        UserTasteBuddiesController controller = new UserTasteBuddiesController(mockService);

        // Rufen Sie die Methode des Controllers auf, die getestet werden soll
        UserTasteBuddies resultUser = controller.registerUserTasteBuddies("TestUser", "TestPassword");

        // Überprüfen Sie das Ergebnis
        assertEquals(expectedUser, resultUser);
    }
}
