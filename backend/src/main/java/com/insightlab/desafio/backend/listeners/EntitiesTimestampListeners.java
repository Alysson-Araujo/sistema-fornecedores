package com.insightlab.desafio.backend.listeners;

import com.insightlab.desafio.backend.interfaces.TimestampedEntityInterface;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.util.Date;

public class EntitiesTimestampListeners {

    @PrePersist
    public void prePersist(Object entity) {
        Date currentDate = new Date();
        TimestampedEntityInterface timestampedEntity = (TimestampedEntityInterface) entity;
        timestampedEntity.setCreatedAt(currentDate);
        timestampedEntity.setUpdatedAt(currentDate);
    }
    @PreUpdate
    public void preUpdate(Object entity) {
        TimestampedEntityInterface timestampedEntity = (TimestampedEntityInterface) entity;
        timestampedEntity.setUpdatedAt(new Date());
    }

}