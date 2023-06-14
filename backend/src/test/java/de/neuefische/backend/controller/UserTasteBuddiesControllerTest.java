package de.neuefische.backend.controller;

import de.neuefische.backend.model.UserTasteBuddies;
import de.neuefische.backend.repository.MongoUserTasteBuddiesRepo;
import de.neuefische.backend.service.UUIDService;
import de.neuefische.backend.service.UserTasteBuddiesDetailsService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserTasteBuddiesControllerTest {


    private UserTasteBuddiesController controller;

    MongoUserTasteBuddiesRepo userRepo = mock(MongoUserTasteBuddiesRepo.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    UUIDService uuidService = mock(UUIDService.class);
    UserTasteBuddiesDetailsService service = new UserTasteBuddiesDetailsService(userRepo, passwordEncoder, uuidService);
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

        UserTasteBuddiesDetailsService mockService = mock(UserTasteBuddiesDetailsService.class);

        UserTasteBuddies expectedUser = new UserTasteBuddies();
        expectedUser.setUserName("testUser");
        expectedUser.setUserPassword("testPassword");
        when(mockService.registerUserTasteBuddies(anyString(), anyString())).thenReturn(expectedUser);

        UserTasteBuddiesController controller = new UserTasteBuddiesController(mockService);
        UserTasteBuddies resultUser = controller.registerUserTasteBuddies("TestUser", "TestPassword");


        assertEquals(expectedUser, resultUser);
    }


    @Test
    void testLoadUserByName() {
        String username = "noUser";

        when(userRepo.findUserByUserName(username)).thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> {
            service.loadUserByUsername(username);
        });

        Mockito.verify(userRepo).findUserByUserName(username);
    }

}