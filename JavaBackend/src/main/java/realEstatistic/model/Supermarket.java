package realEstatistic.model;

import java.util.UUID;

public class Supermarket extends Facility {
    private UUID supermarketId;
    private String supermarketName;
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

    public void setLat(float lat) {
        this.lat = lat;
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
