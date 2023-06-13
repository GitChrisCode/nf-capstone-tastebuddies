package de.neuefische.backend.service;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UUIDServiceTest {
    /*@Test
    void testGenerateUUID() {
        // GIVEN
        UUIDService mockUUIDService = mock(UUIDService.class);

        String expectedUUID = "65b77096-21cf-4ccb-b070-02aed68dcd74";

        //WHEN
        when(mockUUIDService.generateUUID().toString()).thenReturn(expectedUUID);

        String resultUUID = mockUUIDService.generateUUID();

        //THEN
        assertEquals(expectedUUID, resultUUID);
    }*/
    @Test
        void testGenerateUUID() {
            // GIVEN
            UUIDService uuidService = new UUIDService();

            // WHEN
            String resultUUID = uuidService.generateUUID();

            // THEN
            assertEquals(36, resultUUID.length());
        }

}
