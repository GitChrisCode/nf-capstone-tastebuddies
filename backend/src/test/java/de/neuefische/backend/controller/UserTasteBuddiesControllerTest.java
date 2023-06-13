package de.neuefische.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
public class UserTasteBuddiesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testRegisterUserTasteBuddies() throws Exception {
        //given
        String userName = "testUser";
        String userPassword = "testPassword";

        // when/then
        mockMvc.perform(post("/tb/user/registration")
                        .param("userName", userName)
                        .param("userPassword", userPassword))
                .andExpect(status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.userName").value(userName));

    }
}
