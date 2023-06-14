package de.neuefische.backend.service;
import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class UUIDServiceTest {

    @Test
    void testGenerateUUID_generateTwoUUIDs_checkIfUnequal(){
        final UUIDService uuidService = new UUIDService();
        //Given
        String UUIDOne = uuidService.generateUUID();
        String UUIDTwo = uuidService.generateUUID();
        //Then When
        assertNotEquals(UUIDOne, UUIDTwo);
    }

}
