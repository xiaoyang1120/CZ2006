package realEstatistic.model;

import java.util.UUID;

public class Supermarket {
    private UUID supermarketId;
    private String supermarketName;
    private float lat;
    private float long_;
    private String description;

    public UUID getSupermarketId() {
        return supermarketId;
    }

    public void setSupermarketId(UUID supermarketId) {
        this.supermarketId = supermarketId;
    }

    public String getSupermarketName() {
        return supermarketName;
    }

    public void setSupermarketName(String supermarketName) {
        this.supermarketName = supermarketName;
    }

    public float getLat() {
        return lat;
    }

    public void setLat(float lat) {
        this.lat = lat;
    }

    public float getLong_() {
        return long_;
    }

    public void setLong_(float long_) {
        this.long_ = long_;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Supermarket(UUID supermarketId, String supermarketName, float lat, float long_, String description) {
        this.supermarketId = supermarketId;
        this.supermarketName = supermarketName;
        this.lat = lat;
        this.long_ = long_;
        this.description = description;
    }
}
