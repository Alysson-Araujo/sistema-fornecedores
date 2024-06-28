package com.insightlab.desafio.backend.interfaces;

import java.util.Date;

public interface TimestampedEntityInterface {
    void setCreatedAt(Date createdAt);
    void setUpdatedAt(Date updatedAt);

}
