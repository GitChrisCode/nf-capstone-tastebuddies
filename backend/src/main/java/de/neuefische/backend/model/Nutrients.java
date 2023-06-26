package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nutrients {
    private String name;
    private String amountK;
    private String unit;
    private String percentOfDailyNeeds;
}
